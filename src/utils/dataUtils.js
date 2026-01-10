import Papa from 'papaparse';

export async function loadDataset() {
  try {
    const response = await fetch('/Data/fedex_dca_enriched_dataset.csv');
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading dataset:', error);
    throw error;
  }
}

export function calculateDashboardMetrics(data) {
  if (!data || data.length === 0) {
    return {
      totalOutstanding: 0,
      totalRecovered: 0,
      activeSLABreaches: 0,
      recoveryRate: 0,
      totalCases: 0,
      openCases: 0,
      closedCases: 0,
      averageRecoveryAmount: 0
    };
  }

  const totalOutstanding = data.reduce((sum, row) => sum + (row.invoice_amount || 0), 0);
  const totalRecovered = data.reduce((sum, row) => sum + (row.amount_recovered || 0), 0);
  const activeSLABreaches = data.filter(row => 
    row.sla_breach_count > 0 && row.case_status !== 'Closed'
  ).length;
  const recoveryRate = totalOutstanding > 0 ? (totalRecovered / totalOutstanding) * 100 : 0;
  
  const totalCases = data.length;
  const openCases = data.filter(row => row.case_status === 'Open').length;
  const closedCases = data.filter(row => row.case_status === 'Closed').length;
  const recoveredCases = data.filter(row => row.recovered === 1).length;
  const averageRecoveryAmount = recoveredCases > 0 ? totalRecovered / recoveredCases : 0;

  return {
    totalOutstanding,
    totalRecovered,
    activeSLABreaches,
    recoveryRate,
    totalCases,
    openCases,
    closedCases,
    averageRecoveryAmount
  };
}

export function getPriorityDistribution(data) {
  const distribution = { High: 0, Medium: 0, Low: 0 };
  data.forEach(row => {
    if (Object.prototype.hasOwnProperty.call(distribution, row.priority_level)) {
      distribution[row.priority_level]++;
    }
  });
  return Object.entries(distribution).map(([name, value]) => ({ name, value }));
}

export function getDebtAgeingData(data) {
  const bins = { '0-30 days': 0, '31-60 days': 0, '61-90 days': 0, '91+ days': 0 };
  
  data.forEach(row => {
    const days = row.days_overdue || 0;
    if (days <= 30) bins['0-30 days'] += row.invoice_amount || 0;
    else if (days <= 60) bins['31-60 days'] += row.invoice_amount || 0;
    else if (days <= 90) bins['61-90 days'] += row.invoice_amount || 0;
    else bins['91+ days'] += row.invoice_amount || 0;
  });
  
  return Object.entries(bins).map(([name, value]) => ({ name, value }));
}

export function getRecoveryByAgency(data) {
  const agencyMap = {};
  
  data.forEach(row => {
    const agency = row.dca_id || 'Unknown';
    if (!agencyMap[agency]) {
      agencyMap[agency] = { totalInvoice: 0, totalRecovered: 0 };
    }
    agencyMap[agency].totalInvoice += row.invoice_amount || 0;
    agencyMap[agency].totalRecovered += row.amount_recovered || 0;
  });
  
  return Object.entries(agencyMap).map(([name, data]) => ({
    name,
    recoveryRate: data.totalInvoice > 0 ? (data.totalRecovered / data.totalInvoice) * 100 : 0
  })).sort((a, b) => b.recoveryRate - a.recoveryRate);
}

export function getSLABreachesByAgency(data) {
  const agencyMap = {};
  
  data.forEach(row => {
    const agency = row.dca_id || 'Unknown';
    if (!agencyMap[agency]) {
      agencyMap[agency] = 0;
    }
    agencyMap[agency] += row.sla_breach_count || 0;
  });
  
  return Object.entries(agencyMap).map(([name, breaches]) => ({
    name,
    breaches
  })).sort((a, b) => b.breaches - a.breaches);
}

export function getCaseStatusDistribution(data) {
  const statusMap = {};
  
  data.forEach(row => {
    const status = row.case_status || 'Unknown';
    statusMap[status] = (statusMap[status] || 0) + 1;
  });
  
  return Object.entries(statusMap).map(([name, value]) => ({ name, value }));
}

export function getEscalationReasons(data) {
  const reasonMap = {};
  
  data.forEach(row => {
    if (row.escalation_reason && row.escalation_reason !== '') {
      const reason = row.escalation_reason;
      reasonMap[reason] = (reasonMap[reason] || 0) + 1;
    }
  });
  
  return Object.entries(reasonMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

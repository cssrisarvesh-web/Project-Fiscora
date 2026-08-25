import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { useTheme } from '../contexts/ThemeContext';
import { formatCurrency } from '../utils/formatters';
import { Calculator, Home, Coins, ShieldCheck, Flame } from 'lucide-react';

type ToolKey = 'sip' | 'prepay' | 'emergency' | 'goal' | 'buy-rent';

export const FinancialTools: React.FC = () => {
  const { currency } = useTheme();
  const [activeTool, setActiveTool] = useState<ToolKey>('sip');

  // 1. SIP vs Lump Sum State
  const [sipMonthly, setSipMonthly] = useState(500);
  const [lumpSum, setLumpSum] = useState(10000);
  const [sipYears, setSipYears] = useState(10);
  const [sipReturns, setSipReturns] = useState(12);

  // 2. Prepay vs Invest State
  const [loanBalance, setLoanBalance] = useState(50000);
  const [loanRate, setLoanRate] = useState(6.5);
  const [investRate, setInvestRate] = useState(9.0);
  const [prepayMonthly, setPrepayMonthly] = useState(500);

  // 3. Emergency Fund State
  const [monthlyExpense, setMonthlyExpense] = useState(3000);
  const [coverMonths, setCoverMonths] = useState(6);

  // 4. Goal Planner State
  const [goalTarget, setGoalTarget] = useState(100000);
  const [goalYears, setGoalYears] = useState(8);
  const [goalInflation, setGoalInflation] = useState(4.0);
  const [goalReturns, setGoalReturns] = useState(10);

  // 5. Buy vs Rent State
  const [buyPrice, setBuyPrice] = useState(400000);
  const [rentMonthly, setRentMonthly] = useState(1500);
  const [calcYears, setCalcYears] = useState(15);

  // CALCULATIONS

  // SIP calculation: FV = P * [((1 + i)^n - 1) / i] * (1 + i)
  const calcSip = () => {
    const monthlyRate = (sipReturns / 100) / 12;
    const months = sipYears * 12;
    const invested = sipMonthly * months;
    let total = 0;
    if (monthlyRate > 0) {
      total = sipMonthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      total = invested;
    }
    const returns = total - invested;

    // Lump sum calculation: FV = PV * (1 + r)^n
    const totalLump = lumpSum * Math.pow(1 + (sipReturns / 100), sipYears);
    const returnsLump = totalLump - lumpSum;

    return { 
      sipInvested: invested, 
      sipTotal: total, 
      sipReturns: returns,
      lumpInvested: lumpSum,
      lumpTotal: totalLump,
      lumpReturns: returnsLump
    };
  };

  // Prepayment saving calculation
  const calcPrepay = () => {
    const monthlyLoanRate = (loanRate / 100) / 12;
    // Standard EMI estimate (assuming 15 year initial term for calculation ease)
    const initialMonths = 180; 
    const p = loanBalance;
    const r = monthlyLoanRate;
    const emi = r > 0 ? (p * r * Math.pow(1 + r, initialMonths)) / (Math.pow(1 + r, initialMonths) - 1) : p / initialMonths;

    // Estimate interest paid with and without prepayment
    let balanceNoPrepay = p;
    let interestNoPrepay = 0;
    for (let m = 0; m < initialMonths; m++) {
      const interest = balanceNoPrepay * r;
      interestNoPrepay += interest;
      balanceNoPrepay = balanceNoPrepay + interest - emi;
      if (balanceNoPrepay <= 0) break;
    }

    let balancePrepay = p;
    let interestPrepay = 0;
    let monthsToPay = 0;
    for (let m = 0; m < initialMonths; m++) {
      const interest = balancePrepay * r;
      interestPrepay += interest;
      balancePrepay = balancePrepay + interest - (emi + prepayMonthly);
      monthsToPay = m + 1;
      if (balancePrepay <= 0) {
        break;
      }
    }

    const interestSaved = interestNoPrepay - interestPrepay;
    const timeSavedMonths = initialMonths - monthsToPay;

    // Investment potential: investing prepay amount instead
    const monthlyInvestRate = (investRate / 100) / 12;
    const totalInvestGains = prepayMonthly * ((Math.pow(1 + monthlyInvestRate, initialMonths) - 1) / monthlyInvestRate) * (1 + monthlyInvestRate);
    const principalInvested = prepayMonthly * initialMonths;

    return {
      interestSaved,
      monthsSaved: timeSavedMonths,
      totalInvestGains: totalInvestGains - principalInvested,
      principalInvested,
      isPrepayBetter: interestSaved > (totalInvestGains - principalInvested)
    };
  };

  // Emergency Fund
  const calcEmergency = () => {
    const target = monthlyExpense * coverMonths;
    return {
      target,
      breakdown: {
        rent: target * 0.4,
        groceries: target * 0.25,
        bills: target * 0.15,
        insurance: target * 0.1,
        buffer: target * 0.1
      }
    };
  };

  // Goal Planner
  const calcGoal = () => {
    // Adjusted Target = Target * (1 + inflation)^years
    const inflatedTarget = goalTarget * Math.pow(1 + (goalInflation / 100), goalYears);
    const monthlyRate = (goalReturns / 100) / 12;
    const months = goalYears * 12;
    
    // Required Monthly Savings = Inflated Target * [i / ((1+i)^n - 1)]
    let reqSip = 0;
    if (monthlyRate > 0) {
      reqSip = inflatedTarget * (monthlyRate / (Math.pow(1 + monthlyRate, months) - 1));
    } else {
      reqSip = inflatedTarget / months;
    }

    return {
      inflatedTarget,
      requiredMonthly: reqSip,
      inflationImpact: inflatedTarget - goalTarget
    };
  };

  // Buy vs Rent Wealth comparison after N years
  const calcBuyRent = () => {
    // Estimations over N years
    const years = calcYears;
    
    // Renting path: Rent + investing the downpayment/buying costs difference
    // Assume Rent increases by 4% per year.
    let rentWealth = 0;
    let currentRent = rentMonthly;
    let totalRentPaid = 0;
    for (let y = 0; y < years; y++) {
      totalRentPaid += currentRent * 12;
      currentRent *= 1.04;
    }
    
    // Assume downpayment of 20% + closing costs = 25% of purchase price is invested instead
    const initialInvestment = buyPrice * 0.25;
    const investmentGrowth = initialInvestment * Math.pow(1.08, years); // 8% returns
    rentWealth = investmentGrowth - totalRentPaid;

    // Buying path: House appreciates by 4.5% per year
    const houseValue = buyPrice * Math.pow(1.045, years);
    // Assume mortgage balance after N years (roughly 60% of original price remaining)
    const remainingMortgage = buyPrice * 0.8 * 0.6;
    const buyWealth = houseValue - remainingMortgage;

    return {
      rentWealth,
      totalRentPaid,
      buyWealth,
      houseValue,
      isBuyBetter: buyWealth > rentWealth
    };
  };

  const tools = [
    { key: 'sip' as const, label: 'SIP vs Lump Sum', icon: Coins },
    { key: 'prepay' as const, label: 'Prepay vs Invest', icon: Flame },
    { key: 'emergency' as const, label: 'Emergency Fund', icon: ShieldCheck },
    { key: 'goal' as const, label: 'Goal Planner', icon: Calculator },
    { key: 'buy-rent' as const, label: 'Buy vs Rent', icon: Home },
  ];

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">Financial Calculators</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Simulate scenarios to optimize capital, debt, and home acquisition.</p>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex overflow-x-auto gap-2 pb-1.5 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {tools.map((t) => {
          const Icon = t.icon;
          const isActive = activeTool === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTool(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow shadow-emerald-700/10' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* SIP vs Lump Sum Calculator */}
      {activeTool === 'sip' && (() => {
        const res = calcSip();
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Investment Inputs" className="lg:col-span-1 space-y-5">
              {/* Monthly SIP slider */}
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Monthly SIP Amount</span>
                  <span className="text-emerald-500">{formatCurrency(sipMonthly, currency)}</span>
                </label>
                <input 
                  type="range" 
                  min="50" 
                  max="5000" 
                  step="50"
                  value={sipMonthly}
                  onChange={(e) => setSipMonthly(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Lump Sum slider */}
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Lump Sum Amount</span>
                  <span className="text-emerald-500">{formatCurrency(lumpSum, currency)}</span>
                </label>
                <input 
                  type="range" 
                  min="1000" 
                  max="100000" 
                  step="1000"
                  value={lumpSum}
                  onChange={(e) => setLumpSum(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Years slider */}
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Investment Horizon</span>
                  <span className="text-emerald-500">{sipYears} Years</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="40" 
                  value={sipYears}
                  onChange={(e) => setSipYears(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Return Rate slider */}
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Expected Annual Returns</span>
                  <span className="text-emerald-500">{sipReturns}%</span>
                </label>
                <input 
                  type="range" 
                  min="2" 
                  max="25" 
                  value={sipReturns}
                  onChange={(e) => setSipReturns(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </Card>

            {/* Results Grid */}
            <div className="lg:col-span-2 space-y-6">
              {/* SIP Results Card */}
              <Card title="Monthly SIP Projection Summary" className="bg-slate-50 dark:bg-slate-900/40">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Invested</span>
                    <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">{formatCurrency(res.sipInvested, currency)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Estimated Returns</span>
                    <p className="text-lg font-bold text-emerald-500 mt-0.5">+{formatCurrency(res.sipReturns, currency)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Future Wealth</span>
                    <p className="text-xl font-extrabold text-slate-800 dark:text-white mt-0.5">{formatCurrency(res.sipTotal, currency)}</p>
                  </div>
                </div>
              </Card>

              {/* Lump Sum Results Card */}
              <Card title="One-time Lump Sum Projection Summary" className="bg-slate-50 dark:bg-slate-900/40">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Invested</span>
                    <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">{formatCurrency(res.lumpInvested, currency)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Estimated Returns</span>
                    <p className="text-lg font-bold text-emerald-500 mt-0.5">+{formatCurrency(res.lumpReturns, currency)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Future Wealth</span>
                    <p className="text-xl font-extrabold text-slate-800 dark:text-white mt-0.5">{formatCurrency(res.lumpTotal, currency)}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      })()}

      {/* Prepay vs Invest Calculator */}
      {activeTool === 'prepay' && (() => {
        const res = calcPrepay();
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Debt & Return Inputs" className="lg:col-span-1 space-y-5">
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Current Loan Balance</span>
                  <span className="text-emerald-500">{formatCurrency(loanBalance, currency)}</span>
                </label>
                <input 
                  type="range" 
                  min="5000" 
                  max="300000" 
                  step="5000"
                  value={loanBalance}
                  onChange={(e) => setLoanBalance(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Loan Interest Rate</span>
                  <span className="text-emerald-500">{loanRate}%</span>
                </label>
                <input 
                  type="range" 
                  min="2" 
                  max="15" 
                  step="0.1"
                  value={loanRate}
                  onChange={(e) => setLoanRate(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Expected Investment yield</span>
                  <span className="text-emerald-500">{investRate}%</span>
                </label>
                <input 
                  type="range" 
                  min="3" 
                  max="20" 
                  step="0.1"
                  value={investRate}
                  onChange={(e) => setInvestRate(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Monthly Prepayment Amount</span>
                  <span className="text-emerald-500">{formatCurrency(prepayMonthly, currency)}</span>
                </label>
                <input 
                  type="range" 
                  min="50" 
                  max="2000" 
                  step="50"
                  value={prepayMonthly}
                  onChange={(e) => setPrepayMonthly(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </Card>

            <div className="lg:col-span-2 space-y-6">
              <Card title="Analysis Comparison Results">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Option A: Prepay */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider">Option A: Prepay Loan</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Interest Cost Saved:</span>
                        <span className="font-bold text-emerald-500">{formatCurrency(res.interestSaved, currency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Loan Tenure Saved:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{res.monthsSaved} Months</span>
                      </div>
                    </div>
                  </div>

                  {/* Option B: Invest */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider">Option B: Invest Capital</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Investment Growth Gains:</span>
                        <span className="font-bold text-emerald-500">{formatCurrency(res.totalInvestGains, currency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Principal Contribution:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{formatCurrency(res.principalInvested, currency)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-emerald-500" />
                    Fiscora Smart Recommendation
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {res.isPrepayBetter ? (
                      `Because your loan interest rate (${loanRate}%) is relatively high compared to the risk-adjusted returns of investing, prepaying the debt yields a guaranteed savings of ${formatCurrency(res.interestSaved, currency)} and pays off your debt ${res.monthsSaved} months early. Prepayment is recommended.`
                    ) : (
                      `Since your expected investment return (${investRate}%) exceeds the interest rate of your loan (${loanRate}%), investing the extra capital can yield approximately ${formatCurrency(res.totalInvestGains - res.interestSaved, currency)} more net wealth over the loan term. Investing is mathematically superior.`
                    )}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        );
      })()}

      {/* Emergency Fund Calculator */}
      {activeTool === 'emergency' && (() => {
        const res = calcEmergency();
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Emergency Reserve Inputs" className="lg:col-span-1 space-y-5">
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Monthly Expenses</span>
                  <span className="text-emerald-500">{formatCurrency(monthlyExpense, currency)}</span>
                </label>
                <input 
                  type="range" 
                  min="500" 
                  max="15000" 
                  step="250"
                  value={monthlyExpense}
                  onChange={(e) => setMonthlyExpense(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Coverage Months</span>
                  <span className="text-emerald-500">{coverMonths} Months</span>
                </label>
                <input 
                  type="range" 
                  min="3" 
                  max="12" 
                  step="3"
                  value={coverMonths}
                  onChange={(e) => setCoverMonths(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </Card>

            <div className="lg:col-span-2 space-y-6">
              <Card title="Emergency Fund Target Requirements">
                <div className="flex flex-col sm:flex-row items-baseline justify-between mb-4 gap-2">
                  <span className="text-xs text-slate-500">Calculated Reserve Goal Target:</span>
                  <h3 className="text-3xl font-extrabold text-emerald-500">{formatCurrency(res.target, currency)}</h3>
                </div>

                <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-850">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Fund Breakdown Estimate:</h4>
                  
                  {/* Category bars */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                        <span>Housing & Utilities (40%)</span>
                        <span>{formatCurrency(res.breakdown.rent, currency)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '40%' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                        <span>Groceries & Essentials (25%)</span>
                        <span>{formatCurrency(res.breakdown.groceries, currency)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '25%' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                        <span>Bills & Debt Payments (15%)</span>
                        <span>{formatCurrency(res.breakdown.bills, currency)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: '15%' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                        <span>Insurance Premiums (10%)</span>
                        <span>{formatCurrency(res.breakdown.insurance, currency)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: '10%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      })()}

      {/* Goal Planner Calculator */}
      {activeTool === 'goal' && (() => {
        const res = calcGoal();
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Milestone Target Inputs" className="lg:col-span-1 space-y-5">
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Goal Target Amount</span>
                  <span className="text-emerald-500">{formatCurrency(goalTarget, currency)}</span>
                </label>
                <input 
                  type="range" 
                  min="5000" 
                  max="500000" 
                  step="5000"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Years to Target</span>
                  <span className="text-emerald-500">{goalYears} Years</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={goalYears}
                  onChange={(e) => setGoalYears(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Expected Inflation Rate</span>
                  <span className="text-emerald-500">{goalInflation}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="12" 
                  step="0.5"
                  value={goalInflation}
                  onChange={(e) => setGoalInflation(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Expected Portfolio Return</span>
                  <span className="text-emerald-500">{goalReturns}%</span>
                </label>
                <input 
                  type="range" 
                  min="2" 
                  max="20" 
                  value={goalReturns}
                  onChange={(e) => setGoalReturns(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </Card>

            <div className="lg:col-span-2 space-y-6">
              <Card title="Calculated Goal Plan Metrics">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Target Adjusted for Inflation</span>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mt-1">
                      {formatCurrency(res.inflatedTarget, currency)}
                    </h4>
                    <p className="text-[10px] text-rose-500 font-semibold mt-1">
                      +{formatCurrency(res.inflationImpact, currency)} erosion impact
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Required Monthly Savings</span>
                    <h4 className="text-xl font-extrabold text-emerald-500 mt-1">
                      {formatCurrency(res.requiredMonthly, currency)} / mo
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1">Assuming {goalReturns}% return rate compounding</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      })()}

      {/* Buy vs Rent Calculator */}
      {activeTool === 'buy-rent' && (() => {
        const res = calcBuyRent();
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Housing Inputs" className="lg:col-span-1 space-y-5">
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Home Purchase Price</span>
                  <span className="text-emerald-500">{formatCurrency(buyPrice, currency)}</span>
                </label>
                <input 
                  type="range" 
                  min="50000" 
                  max="1500000" 
                  step="25000"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Equivalent Monthly Rent</span>
                  <span className="text-emerald-500">{formatCurrency(rentMonthly, currency)}</span>
                </label>
                <input 
                  type="range" 
                  min="400" 
                  max="6000" 
                  step="50"
                  value={rentMonthly}
                  onChange={(e) => setRentMonthly(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Comparison Term</span>
                  <span className="text-emerald-500">{calcYears} Years</span>
                </label>
                <input 
                  type="range" 
                  min="5" 
                  max="30" 
                  step="5"
                  value={calcYears}
                  onChange={(e) => setCalcYears(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </Card>

            <div className="lg:col-span-2 space-y-6">
              <Card title={`Wealth Forecast Comparison after ${calcYears} Years`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Buy Wealth */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-3">Option A: Buying Home</h4>
                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-350">
                      <div className="flex justify-between">
                        <span>Expected House Value:</span>
                        <span className="font-bold">{formatCurrency(res.houseValue, currency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net Equity Wealth:</span>
                        <span className="font-bold text-emerald-500">{formatCurrency(res.buyWealth, currency)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rent Wealth */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-3">Option B: Renting & Investing</h4>
                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-350">
                      <div className="flex justify-between">
                        <span>Total Rent Paid:</span>
                        <span className="font-bold text-rose-500">-{formatCurrency(res.totalRentPaid, currency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net Account Value:</span>
                        <span className="font-bold text-emerald-500">{formatCurrency(res.rentWealth, currency)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Home className="w-4 h-4 text-emerald-500" />
                    Buying vs Renting Wealth Verdict
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {res.isBuyBetter ? (
                      `Over a ${calcYears}-year period, buying is estimated to generate a net wealth benefit of approximately ${formatCurrency(res.buyWealth - res.rentWealth, currency)} over renting. The appreciation of the real estate asset outpaced rent inflation and capital compound returns. Buying is recommended.`
                    ) : (
                      `Over a ${calcYears}-year period, renting and investing the downpayment/buying costs difference is expected to outperform homeownership equity by roughly ${formatCurrency(res.rentWealth - res.buyWealth, currency)}. The total rent cost was offset by aggressive index compounding. Renting is recommended.`
                    )}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

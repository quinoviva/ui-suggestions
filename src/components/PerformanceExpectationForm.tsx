import { useState } from 'react';
import { FileText, Calendar, Building2, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';

interface Strategy {
  id: number;
  objectives: string;
  goals: string[];
  strategies: string[];
  measures: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
  };
  projectOwner: string[];
  strategyQuarters?: {
    [key: string]: ('q1' | 'q2' | 'q3' | 'q4')[];
  };
}

interface EssentialFunction {
  id: number;
  kra: string;
  specificObjectives: string;
  kpis: {
    type: string;
    description: string;
    belowExpectation: string;
    meetsExpectation: string;
    exceedsExpectation: string;
  }[];
}

const departments = [
  'IRCTO',
  'Human Resources',
  'Finance',
  'Operations',
  'Marketing',
  'Sales',
  'IT Department',
  'Customer Service',
  'Legal',
  'Administration'
];

const sampleData: Strategy[] = [
  {
    id: 1,
    objectives: "Develop online platform system to effectively consolidate all end-user concerns nationwide",
    goals: [
      "Implement a single platform system consolidating customer concerns throughout the whole organization",
      "Develop a continuous customer satisfaction and brand reputation tracker that is complete across all channels and concerns and come up with relevant solutions"
    ],
    strategies: [
      "Establish and hire system development team to handle and support all in-house applications systems development",
      "Prepare development sandbox and server environment and program DEV/Technical Teams",
      "Conduct system tests with sample data and quality bugs",
      "Execute user and pilot test with actual data from field",
      "Deploy to production environment on HO",
      "Onboard and user training",
      "Conduct orientation and training for novice programmers and backend technical support"
    ],
    measures: {
      q1: 100,
      q2: 60,
      q3: 100,
      q4: 100
    },
    projectOwner: [
      "Ronald Sebastian Justion - System Information Technology Developer",
      "System Developer Team"
    ],
    strategyQuarters: {
      "0": ['q1', 'q2'],
      "1": ['q1', 'q2'],
      "2": ['q2', 'q3'],
      "3": ['q2', 'q3'],
      "4": ['q3'],
      "5": ['q3', 'q4'],
      "6": ['q4']
    }
  }
];

const essentialFunctionsData: EssentialFunction[] = [
  {
    id: 1,
    kra: "Application Development and Implementation",
    specificObjectives: "To develop and implement application systems",
    kpis: [
      {
        type: "Quantitative KPI",
        description: "(Percentage of application release development tasks completed within allotted timeframe)",
        belowExpectation: "<60% total number of application system development tasks completed within allotted timeframe",
        meetsExpectation: "≥60% total number of application system development tasks completed within allotted timeframe",
        exceedsExpectation: "≥80% total number of application system development tasks completed within allotted timeframe"
      },
      {
        type: "Qualitative KPI",
        description: "(Percentage of application release development tasks completed with Above Average performance)",
        belowExpectation: "<40% total number of application system development tasks completed with AA performance",
        meetsExpectation: "≥60% total number of application system development tasks completed with AA performance",
        exceedsExpectation: ""
      }
    ]
  },
  {
    id: 2,
    kra: "Backend System Maintenance and Support",
    specificObjectives: "To provide continuous backend maintenance and support to all in house application systems including system updates, enhancements and functionalities",
    kpis: [
      {
        type: "Quantitative/Process KPI",
        description: "(Percentage of backend maintenance and support tasks completed within allotted timeframe)",
        belowExpectation: "<60% total number of backend maintenance and support tasks completed within allotted timeframe",
        meetsExpectation: "≥60% total number of backend maintenance and support tasks completed within allotted timeframe",
        exceedsExpectation: "≥80% total number of backend maintenance and support tasks completed within allotted timeframe"
      }
    ]
  }
];

export function PerformanceExpectationForm() {
  const [formType, setFormType] = useState<'semi-annual' | 'annual'>('semi-annual');
  const [remarks, setRemarks] = useState('');
  const [department, setDepartment] = useState('IRCTO');
  const [assignment, setAssignment] = useState('Central Office');
  const [expandedRows, setExpandedRows] = useState<number[]>([1]);
  const [strategies, setStrategies] = useState<Strategy[]>(sampleData);
  const [editingStrategy, setEditingStrategy] = useState<number | null>(null);
  const [essentialFunctions, setEssentialFunctions] = useState<EssentialFunction[]>(essentialFunctionsData);
  const [editingEF, setEditingEF] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const getMeasureColor = (value: number) => {
    if (value === 100) return 'bg-green-500';
    if (value >= 60) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  };

  const addNewStrategy = () => {
    const newStrategy: Strategy = {
      id: strategies.length + 1,
      objectives: "",
      goals: [],
      strategies: [],
      measures: {
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0
      },
      projectOwner: [],
      strategyQuarters: {}
    };
    setStrategies([...strategies, newStrategy]);
  };

  const updateStrategy = (id: number, field: keyof Strategy, value: any) => {
    setStrategies(prev =>
      prev.map(strategy =>
        strategy.id === id ? { ...strategy, [field]: value } : strategy
      )
    );
  };

  const deleteStrategy = (id: number) => {
    setStrategies(prev => prev.filter(strategy => strategy.id !== id));
  };

  const addGoal = (strategyId: number) => {
    setStrategies(prev =>
      prev.map(strategy =>
        strategy.id === strategyId ? { ...strategy, goals: [...strategy.goals, ""] } : strategy
      )
    );
  };

  const updateGoal = (strategyId: number, goalIndex: number, value: string) => {
    setStrategies(prev =>
      prev.map(strategy =>
        strategy.id === strategyId ? { ...strategy, goals: strategy.goals.map((goal, idx) => idx === goalIndex ? value : goal) } : strategy
      )
    );
  };

  const removeGoal = (strategyId: number, goalIndex: number) => {
    setStrategies(prev =>
      prev.map(strategy =>
        strategy.id === strategyId ? { ...strategy, goals: strategy.goals.filter((_, idx) => idx !== goalIndex) } : strategy
      )
    );
  };

  const addStrategyItem = (strategyId: number) => {
    setStrategies(prev =>
      prev.map(strategy =>
        strategy.id === strategyId ? { ...strategy, strategies: [...strategy.strategies, ""] } : strategy
      )
    );
  };

  const updateStrategyItem = (strategyId: number, index: number, value: string) => {
    setStrategies(prev =>
      prev.map(strategy =>
        strategy.id === strategyId ? { ...strategy, strategies: strategy.strategies.map((strat, idx) => idx === index ? value : strat) } : strategy
      )
    );
  };

  const removeStrategyItem = (strategyId: number, index: number) => {
    setStrategies(prev =>
      prev.map(strategy =>
        strategy.id === strategyId ? { ...strategy, strategies: strategy.strategies.filter((_, idx) => idx !== index) } : strategy
      )
    );
  };

  const toggleQuarter = (strategyId: number, index: number, quarter: 'q1' | 'q2' | 'q3' | 'q4') => {
    setStrategies(prev =>
      prev.map(strategy =>
        strategy.id === strategyId ? {
          ...strategy,
          strategyQuarters: {
            ...strategy.strategyQuarters,
            [index]: strategy.strategyQuarters?.[index]?.includes(quarter)
              ? strategy.strategyQuarters?.[index]?.filter(q => q !== quarter)
              : [...(strategy.strategyQuarters?.[index] || []), quarter]
          }
        } : strategy
      )
    );
  };

  const updateMeasure = (strategyId: number, quarter: 'q1' | 'q2' | 'q3' | 'q4', value: number) => {
    setStrategies(prev =>
      prev.map(strategy =>
        strategy.id === strategyId ? {
          ...strategy,
          measures: {
            ...strategy.measures,
            [quarter]: value
          }
        } : strategy
      )
    );
  };

  const addProjectOwner = (strategyId: number) => {
    setStrategies(prev =>
      prev.map(strategy =>
        strategy.id === strategyId ? { ...strategy, projectOwner: [...strategy.projectOwner, ""] } : strategy
      )
    );
  };

  const updateProjectOwner = (strategyId: number, index: number, value: string) => {
    setStrategies(prev =>
      prev.map(strategy =>
        strategy.id === strategyId ? { ...strategy, projectOwner: strategy.projectOwner.map((owner, idx) => idx === index ? value : owner) } : strategy
      )
    );
  };

  const removeProjectOwner = (strategyId: number, index: number) => {
    setStrategies(prev =>
      prev.map(strategy =>
        strategy.id === strategyId ? { ...strategy, projectOwner: strategy.projectOwner.filter((_, idx) => idx !== index) } : strategy
      )
    );
  };

  // Essential Functions Functions
  const addNewEF = () => {
    const newEF: EssentialFunction = {
      id: essentialFunctions.length + 1,
      kra: "",
      specificObjectives: "",
      kpis: [
        {
          type: "",
          description: "",
          belowExpectation: "",
          meetsExpectation: "",
          exceedsExpectation: ""
        }
      ]
    };
    setEssentialFunctions([...essentialFunctions, newEF]);
    setEditingEF(newEF.id);
  };

  const updateEF = (id: number, field: keyof EssentialFunction, value: any) => {
    setEssentialFunctions(prev =>
      prev.map(ef =>
        ef.id === id ? { ...ef, [field]: value } : ef
      )
    );
  };

  const deleteEF = (id: number) => {
    if (confirm('Are you sure you want to delete this Essential Function?')) {
      setEssentialFunctions(prev => prev.filter(ef => ef.id !== id));
    }
  };

  const addKPI = (efId: number) => {
    setEssentialFunctions(prev =>
      prev.map(ef =>
        ef.id === efId ? {
          ...ef,
          kpis: [
            ...ef.kpis,
            {
              type: "",
              description: "",
              belowExpectation: "",
              meetsExpectation: "",
              exceedsExpectation: ""
            }
          ]
        } : ef
      )
    );
  };

  const updateKPI = (efId: number, kpiIndex: number, field: string, value: string) => {
    setEssentialFunctions(prev =>
      prev.map(ef =>
        ef.id === efId ? {
          ...ef,
          kpis: ef.kpis.map((kpi, idx) =>
            idx === kpiIndex ? { ...kpi, [field]: value } : kpi
          )
        } : ef
      )
    );
  };

  const removeKPI = (efId: number, kpiIndex: number) => {
    setEssentialFunctions(prev =>
      prev.map(ef =>
        ef.id === efId ? {
          ...ef,
          kpis: ef.kpis.filter((_, idx) => idx !== kpiIndex)
        } : ef
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-gray-900">Performance Expectation Form</h1>
        </div>
        
        {/* Form Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-600 text-sm">
              <Calendar className="w-4 h-4" />
              Period
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={formType === 'semi-annual'}
                  onChange={() => setFormType('semi-annual')}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Semi-Annual</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={formType === 'annual'}
                  onChange={() => setFormType('annual')}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Annual</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-600 text-sm">
              Remarks
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter remarks"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-600 text-sm">
              <Building2 className="w-4 h-4" />
              Department/Division
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-600 text-sm">
              <Briefcase className="w-4 h-4" />
              Assignment
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={assignment === 'Central Office'}
                  onChange={() => setAssignment('Central Office')}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Central Office</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={assignment === 'Field'}
                  onChange={() => setAssignment('Field')}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Field</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-sm text-gray-700">
            <span className="text-gray-900">Instructions:</span> Fill up the portion of the Departmental Performance Expectation Form (DPE) and discuss in detail the Objectives, Goals, Strategies and the Measures per quarter both in your 1 and your LT/s for the Breakthrough Strategies (BS) and agree where you are as of period time. Please make sure to list all direct contribution to achieve the intended results even if there is already an assigned person on the specific KRA. Please also note that an assigned KRA does not limit you to assigned functions, but you do, allow room to strengthen the required capabilities before submitting to HRD.
          </p>
        </div>
      </div>

      {/* Main Content - Breakthrough Strategies */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white">Part I - Breakthrough Strategies (BS)</h2>
            <button
              onClick={addNewStrategy}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Add New Strategy
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {strategies.map((strategy) => {
            const isExpanded = expandedRows.includes(strategy.id);
            
            return (
              <div key={strategy.id} className="border-b border-gray-200 last:border-b-0">
                {/* Collapsed View */}
                <div 
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => toggleRow(strategy.id)}
                >
                  <div className="col-span-1 flex items-start justify-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700">
                      {strategy.id}
                    </span>
                  </div>
                  
                  <div className="col-span-11 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-gray-600 text-sm mb-1">Objectives</div>
                        {editingStrategy === strategy.id ? (
                          <textarea
                            value={strategy.objectives}
                            onChange={(e) => updateStrategy(strategy.id, 'objectives', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={2}
                            placeholder="Enter objectives..."
                          />
                        ) : (
                          <p className="text-gray-900">{strategy.objectives || "No objectives set"}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingStrategy(editingStrategy === strategy.id ? null : strategy.id);
                          }}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                        >
                          {editingStrategy === strategy.id ? 'Done' : 'Edit'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Are you sure you want to delete this strategy?')) {
                              deleteStrategy(strategy.id);
                            }
                          }}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                        >
                          Delete
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Quarterly Measures Preview */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">Progress:</span>
                      <div className="flex gap-3">
                        {(['q1', 'q2', 'q3', 'q4'] as const).map((quarter, idx) => {
                          const value = strategy.measures[quarter];
                          return (
                            <div key={quarter} className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">Q{idx + 1}</span>
                              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-600 rounded-full transition-all"
                                  style={{ width: `${value}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-700">{value}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded View */}
                {isExpanded && (
                  <div className="bg-gray-50 px-4 pb-6 space-y-6">
                    <div className="grid grid-cols-12 gap-6 pt-4">
                      {/* Goals */}
                      <div className="col-span-12 md:col-span-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200 h-full">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm text-gray-600">Goals</h3>
                            {editingStrategy === strategy.id && (
                              <button
                                onClick={() => addGoal(strategy.id)}
                                className="text-xs text-blue-600 hover:text-blue-700"
                              >
                                + Add Goal
                              </button>
                            )}
                          </div>
                          <ul className="space-y-3">
                            {strategy.goals.map((goal, idx) => (
                              <li key={idx} className="flex gap-2 text-sm">
                                <span className="text-blue-600 flex-shrink-0">•</span>
                                {editingStrategy === strategy.id ? (
                                  <div className="flex-1 flex gap-2">
                                    <textarea
                                      value={goal}
                                      onChange={(e) => updateGoal(strategy.id, idx, e.target.value)}
                                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                      rows={2}
                                      placeholder="Enter goal..."
                                    />
                                    {strategy.goals.length > 1 && (
                                      <button
                                        onClick={() => removeGoal(strategy.id, idx)}
                                        className="text-red-600 hover:text-red-700 text-xs"
                                      >
                                        ✕
                                      </button>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-gray-700">{goal}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Strategies */}
                      <div className="col-span-12 md:col-span-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200 h-full">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm text-gray-600">Strategies</h3>
                            {editingStrategy === strategy.id && (
                              <button
                                onClick={() => addStrategyItem(strategy.id)}
                                className="text-xs text-blue-600 hover:text-blue-700"
                              >
                                + Add Strategy
                              </button>
                            )}
                          </div>
                          <ul className="space-y-2">
                            {strategy.strategies.map((strat, idx) => (
                              <li key={idx} className="flex gap-2 text-sm">
                                <span className="text-blue-600 flex-shrink-0">•</span>
                                <div className="flex-1">
                                  {editingStrategy === strategy.id ? (
                                    <div className="space-y-2">
                                      <div className="flex gap-2">
                                        <textarea
                                          value={strat}
                                          onChange={(e) => updateStrategyItem(strategy.id, idx, e.target.value)}
                                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                          rows={2}
                                          placeholder="Enter strategy..."
                                        />
                                        {strategy.strategies.length > 1 && (
                                          <button
                                            onClick={() => removeStrategyItem(strategy.id, idx)}
                                            className="text-red-600 hover:text-red-700 text-xs"
                                          >
                                            ✕
                                          </button>
                                        )}
                                      </div>
                                      <div className="flex gap-1">
                                        {['q1', 'q2', 'q3', 'q4'].map((quarter) => (
                                          <button
                                            key={quarter}
                                            onClick={() => toggleQuarter(strategy.id, idx, quarter as 'q1' | 'q2' | 'q3' | 'q4')}
                                            className={`text-xs px-2 py-0.5 rounded cursor-pointer ${
                                              strategy.strategyQuarters?.[idx]?.includes(quarter as 'q1' | 'q2' | 'q3' | 'q4')
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-gray-100 text-gray-400'
                                            }`}
                                          >
                                            {quarter.toUpperCase()}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <span className="block mb-1 text-gray-700">{strat}</span>
                                      {strategy.strategyQuarters?.[idx] && (
                                        <div className="flex gap-1 mt-1">
                                          {['q1', 'q2', 'q3', 'q4'].map((quarter) => (
                                            <span
                                              key={quarter}
                                              className={`text-xs px-2 py-0.5 rounded ${
                                                strategy.strategyQuarters?.[idx]?.includes(quarter as 'q1' | 'q2' | 'q3' | 'q4')
                                                  ? 'bg-blue-100 text-blue-700'
                                                  : 'bg-gray-100 text-gray-400'
                                              }`}
                                            >
                                              {quarter.toUpperCase()}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Measures & Project Owner */}
                      <div className="col-span-12 md:col-span-4 space-y-4">
                        {/* Detailed Measures */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h3 className="text-sm text-gray-600 mb-3">Quarterly Measures</h3>
                          <div className="space-y-3">
                            {(['q1', 'q2', 'q3', 'q4'] as const).map((quarter, idx) => {
                              const value = strategy.measures[quarter];
                              return (
                                <div key={quarter} className="space-y-1">
                                  <div className="flex justify-between text-sm items-center">
                                    <span className="text-gray-600">Q{idx + 1}</span>
                                    {editingStrategy === strategy.id ? (
                                      <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={value}
                                        onChange={(e) => updateMeasure(strategy.id, quarter, parseInt(e.target.value) || 0)}
                                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                                      />
                                    ) : (
                                      <span className="text-gray-900">{value}%</span>
                                    )}
                                  </div>
                                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full transition-all ${getMeasureColor(value)}`}
                                      style={{ width: `${value}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Project Owner */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm text-gray-600">Project Owner</h3>
                            {editingStrategy === strategy.id && (
                              <button
                                onClick={() => addProjectOwner(strategy.id)}
                                className="text-xs text-blue-600 hover:text-blue-700"
                              >
                                + Add Owner
                              </button>
                            )}
                          </div>
                          <div className="space-y-2">
                            {strategy.projectOwner.map((owner, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-blue-700 text-xs">{getInitials(owner || 'NA')}</span>
                                </div>
                                {editingStrategy === strategy.id ? (
                                  <div className="flex-1 flex gap-2 pt-1">
                                    <input
                                      type="text"
                                      value={owner}
                                      onChange={(e) => updateProjectOwner(strategy.id, idx, e.target.value)}
                                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                      placeholder="Enter project owner name..."
                                    />
                                    {strategy.projectOwner.length > 1 && (
                                      <button
                                        onClick={() => removeProjectOwner(strategy.id, idx)}
                                        className="text-red-600 hover:text-red-700 text-xs"
                                      >
                                        ✕
                                      </button>
                                    )}
                                  </div>
                                ) : (
                                  <div className="text-sm text-gray-700 pt-1">{owner}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Part II - Essential Functions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white">Part II. Essential Functions (EF)</h2>
              <p className="text-white text-sm mt-1">Based on JD (1-5)</p>
            </div>
            <button
              onClick={addNewEF}
              className="px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Add New Function
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {essentialFunctions.map((ef) => (
            <div 
              key={ef.id} 
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 border-b border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 flex-shrink-0">
                    {ef.id}
                  </span>
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 mb-1">Key Result Area (KRA)</div>
                    <h3 className="text-gray-900">{ef.kra}</h3>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-4">
                {/* Specific Objectives */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Specific Objectives (SO) & Completion Dates</div>
                  {editingEF === ef.id ? (
                    <textarea
                      value={ef.specificObjectives}
                      onChange={(e) => updateEF(ef.id, 'specificObjectives', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                      rows={3}
                      placeholder="Enter specific objectives and completion dates..."
                    />
                  ) : (
                    <p className="text-gray-900">{ef.specificObjectives || "No objectives set"}</p>
                  )}
                </div>

                {/* KPIs */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm text-gray-700">Key Performance Indicators</h4>
                    {editingEF === ef.id && (
                      <button
                        onClick={() => addKPI(ef.id)}
                        className="text-xs text-green-600 hover:text-green-700"
                      >
                        + Add KPI
                      </button>
                    )}
                  </div>
                  {ef.kpis.map((kpi, kpiIndex) => (
                    <div key={kpiIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* KPI Header */}
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <div className="flex items-start gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex-shrink-0">
                            {kpiIndex + 1}
                          </span>
                          <div className="flex-1 space-y-2">
                            {editingEF === ef.id ? (
                              <>
                                <input
                                  type="text"
                                  value={kpi.type}
                                  onChange={(e) => updateKPI(ef.id, kpiIndex, 'type', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                  placeholder="Enter KPI type (e.g., Quantitative KPI)..."
                                />
                                <input
                                  type="text"
                                  value={kpi.description}
                                  onChange={(e) => updateKPI(ef.id, kpiIndex, 'description', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
                                  placeholder="Enter KPI description..."
                                />
                              </>
                            ) : (
                              <>
                                <div className="text-gray-900">{kpi.type}</div>
                                <div className="text-gray-600 text-xs">{kpi.description}</div>
                              </>
                            )}
                          </div>
                          {editingEF === ef.id && ef.kpis.length > 1 && (
                            <button
                              onClick={() => removeKPI(ef.id, kpiIndex)}
                              className="text-red-600 hover:text-red-700 text-xs px-2 py-1"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Annual Expectations */}
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        {/* Below Expectation */}
                        <div className="p-4 bg-red-50 border-r border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-sm text-gray-900">Below Expectation</span>
                          </div>
                          {editingEF === ef.id ? (
                            <textarea
                              value={kpi.belowExpectation}
                              onChange={(e) => updateKPI(ef.id, kpiIndex, 'belowExpectation', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-red-500 bg-white"
                              rows={3}
                              placeholder="Enter criteria for below expectation..."
                            />
                          ) : (
                            <p className="text-xs text-gray-700">{kpi.belowExpectation || "N/A"}</p>
                          )}
                        </div>

                        {/* Meets Expectation */}
                        <div className="p-4 bg-yellow-50 border-r border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <span className="text-sm text-gray-900">Meets Expectation</span>
                          </div>
                          {editingEF === ef.id ? (
                            <textarea
                              value={kpi.meetsExpectation}
                              onChange={(e) => updateKPI(ef.id, kpiIndex, 'meetsExpectation', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-yellow-500 bg-white"
                              rows={3}
                              placeholder="Enter criteria for meets expectation..."
                            />
                          ) : (
                            <p className="text-xs text-gray-700">{kpi.meetsExpectation || "N/A"}</p>
                          )}
                        </div>

                        {/* Exceeds Expectation */}
                        <div className="p-4 bg-green-50">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-sm text-gray-900">Exceeds Expectation</span>
                          </div>
                          {editingEF === ef.id ? (
                            <textarea
                              value={kpi.exceedsExpectation}
                              onChange={(e) => updateKPI(ef.id, kpiIndex, 'exceedsExpectation', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
                              rows={3}
                              placeholder="Enter criteria for exceeds expectation..."
                            />
                          ) : (
                            <p className="text-xs text-gray-700">{kpi.exceedsExpectation || "N/A"}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Save as Draft
        </button>
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Submit
        </button>
      </div>
    </div>
  );
}

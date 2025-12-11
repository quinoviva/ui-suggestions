<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
      <div class="flex items-center justify-between">
        <h2 class="text-white">Part I - Breakthrough Strategies (BS)</h2>
        <button
          @click="addNewStrategy"
          class="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
        >
          <span class="text-xl">+</span>
          Add New Strategy
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <div v-for="strategy in strategies" :key="strategy.id" class="border-b border-gray-200 last:border-b-0">
        <!-- Collapsed View -->
        <div 
          class="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          @click="toggleRow(strategy.id)"
        >
          <div class="col-span-1 flex items-start justify-center">
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700">
              {{ strategy.id }}
            </span>
          </div>
          
          <div class="col-span-11 space-y-3">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="text-gray-600 text-sm mb-1">Objectives</div>
                <textarea
                  v-if="editingStrategy === strategy.id"
                  :value="strategy.objectives"
                  @input="updateStrategy(strategy.id, 'objectives', $event.target.value)"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  placeholder="Enter objectives..."
                ></textarea>
                <p v-else class="text-gray-900">{{ strategy.objectives || "No objectives set" }}</p>
              </div>
              <div class="flex gap-2">
                <button
                  @click.stop="editingStrategy = editingStrategy === strategy.id ? null : strategy.id"
                  class="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                >
                  {{ editingStrategy === strategy.id ? 'Done' : 'Edit' }}
                </button>
                <button
                  @click.stop="confirmDelete(strategy.id)"
                  class="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                >
                  Delete
                </button>
                <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronUp v-if="expandedRows.includes(strategy.id)" class="w-5 h-5 text-gray-600" />
                  <ChevronDown v-else class="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <!-- Quarterly Measures Preview -->
            <div class="flex items-center gap-4">
              <span class="text-sm text-gray-600">Progress:</span>
              <div class="flex gap-3">
                <div v-for="(quarter, idx) in ['q1', 'q2', 'q3', 'q4']" :key="quarter" class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">Q{{ idx + 1 }}</span>
                  <div class="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-blue-600 rounded-full transition-all"
                      :style="{ width: `${strategy.measures[quarter]}%` }"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-700">{{ strategy.measures[quarter] }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Expanded View -->
        <div v-if="expandedRows.includes(strategy.id)" class="bg-gray-50 px-4 pb-6 space-y-6">
          <div class="grid grid-cols-12 gap-6 pt-4">
            <!-- Goals -->
            <div class="col-span-12 md:col-span-4">
              <div class="bg-white rounded-lg p-4 border border-gray-200 h-full">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm text-gray-600">Goals</h3>
                  <button
                    v-if="editingStrategy === strategy.id"
                    @click="addGoal(strategy.id)"
                    class="text-xs text-blue-600 hover:text-blue-700"
                  >
                    + Add Goal
                  </button>
                </div>
                <ul class="space-y-3">
                  <li v-for="(goal, idx) in strategy.goals" :key="idx" class="flex gap-2 text-sm">
                    <span class="text-blue-600 flex-shrink-0">•</span>
                    <div v-if="editingStrategy === strategy.id" class="flex-1 flex gap-2">
                      <textarea
                        :value="goal"
                        @input="updateGoal(strategy.id, idx, $event.target.value)"
                        class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        rows="2"
                        placeholder="Enter goal..."
                      ></textarea>
                      <button
                        v-if="strategy.goals.length > 1"
                        @click="removeGoal(strategy.id, idx)"
                        class="text-red-600 hover:text-red-700 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                    <span v-else class="text-gray-700">{{ goal }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Strategies -->
            <div class="col-span-12 md:col-span-4">
              <div class="bg-white rounded-lg p-4 border border-gray-200 h-full">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm text-gray-600">Strategies</h3>
                  <button
                    v-if="editingStrategy === strategy.id"
                    @click="addStrategyItem(strategy.id)"
                    class="text-xs text-blue-600 hover:text-blue-700"
                  >
                    + Add Strategy
                  </button>
                </div>
                <ul class="space-y-2">
                  <li v-for="(strat, idx) in strategy.strategies" :key="idx" class="flex gap-2 text-sm">
                    <span class="text-blue-600 flex-shrink-0">•</span>
                    <div class="flex-1">
                      <div v-if="editingStrategy === strategy.id" class="space-y-2">
                        <div class="flex gap-2">
                          <textarea
                            :value="strat"
                            @input="updateStrategyItem(strategy.id, idx, $event.target.value)"
                            class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            rows="2"
                            placeholder="Enter strategy..."
                          ></textarea>
                          <button
                            v-if="strategy.strategies.length > 1"
                            @click="removeStrategyItem(strategy.id, idx)"
                            class="text-red-600 hover:text-red-700 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                        <div class="flex gap-1">
                          <button
                            v-for="quarter in ['q1', 'q2', 'q3', 'q4']"
                            :key="quarter"
                            @click="toggleQuarter(strategy.id, idx, quarter)"
                            :class="`text-xs px-2 py-0.5 rounded cursor-pointer ${
                              strategy.strategyQuarters?.[idx]?.includes(quarter)
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-400'
                            }`"
                          >
                            {{ quarter.toUpperCase() }}
                          </button>
                        </div>
                      </div>
                      <template v-else>
                        <span class="block mb-1 text-gray-700">{{ strat }}</span>
                        <div v-if="strategy.strategyQuarters?.[idx]" class="flex gap-1 mt-1">
                          <span
                            v-for="quarter in ['q1', 'q2', 'q3', 'q4']"
                            :key="quarter"
                            :class="`text-xs px-2 py-0.5 rounded ${
                              strategy.strategyQuarters?.[idx]?.includes(quarter)
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-400'
                            }`"
                          >
                            {{ quarter.toUpperCase() }}
                          </span>
                        </div>
                      </template>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Measures & Project Owner -->
            <div class="col-span-12 md:col-span-4 space-y-4">
              <!-- Detailed Measures -->
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <h3 class="text-sm text-gray-600 mb-3">Quarterly Measures</h3>
                <div class="space-y-3">
                  <div v-for="(quarter, idx) in ['q1', 'q2', 'q3', 'q4']" :key="quarter" class="space-y-1">
                    <div class="flex justify-between text-sm items-center">
                      <span class="text-gray-600">Q{{ idx + 1 }}</span>
                      <input
                        v-if="editingStrategy === strategy.id"
                        type="number"
                        min="0"
                        max="100"
                        :value="strategy.measures[quarter]"
                        @input="updateMeasure(strategy.id, quarter, parseInt($event.target.value) || 0)"
                        class="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <span v-else class="text-gray-900">{{ strategy.measures[quarter] }}%</span>
                    </div>
                    <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        :class="`h-full rounded-full transition-all ${getMeasureColor(strategy.measures[quarter])}`"
                        :style="{ width: `${strategy.measures[quarter]}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Project Owner -->
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm text-gray-600">Project Owner</h3>
                  <button
                    v-if="editingStrategy === strategy.id"
                    @click="addProjectOwner(strategy.id)"
                    class="text-xs text-blue-600 hover:text-blue-700"
                  >
                    + Add Owner
                  </button>
                </div>
                <div class="space-y-2">
                  <div v-for="(owner, idx) in strategy.projectOwner" :key="idx" class="flex items-start gap-2">
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span class="text-blue-700 text-xs">{{ getInitials(owner || 'NA') }}</span>
                    </div>
                    <div v-if="editingStrategy === strategy.id" class="flex-1 flex gap-2 pt-1">
                      <input
                        type="text"
                        :value="owner"
                        @input="updateProjectOwner(strategy.id, idx, $event.target.value)"
                        class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter project owner name..."
                      />
                      <button
                        v-if="strategy.projectOwner.length > 1"
                        @click="removeProjectOwner(strategy.id, idx)"
                        class="text-red-600 hover:text-red-700 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                    <div v-else class="text-sm text-gray-700 pt-1">{{ owner }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

export default {
  components: {
    ChevronDown,
    ChevronUp
  },
  setup() {
    const expandedRows = ref([1]);
    const strategies = ref([
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
    ]);
    const editingStrategy = ref(null);

    const toggleRow = (id) => {
      const index = expandedRows.value.indexOf(id);
      if (index > -1) {
        expandedRows.value.splice(index, 1);
      } else {
        expandedRows.value.push(id);
      }
    };

    const getMeasureColor = (value) => {
      if (value === 100) return 'bg-green-500';
      if (value >= 60) return 'bg-blue-500';
      return 'bg-yellow-500';
    };

    const getInitials = (name) => {
      return name.split(' ').map(n => n[0]).join('').slice(0, 2);
    };

    const addNewStrategy = () => {
      const newStrategy = {
        id: strategies.value.length + 1,
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
      strategies.value.push(newStrategy);
    };

    const updateStrategy = (id, field, value) => {
      const strategy = strategies.value.find(s => s.id === id);
      if (strategy) {
        strategy[field] = value;
      }
    };

    const confirmDelete = (id) => {
        if (confirm('Are you sure you want to delete this strategy?')) {
            deleteStrategy(id);
        }
    };


    const deleteStrategy = (id) => {
      strategies.value = strategies.value.filter(s => s.id !== id);
    };

    const addGoal = (strategyId) => {
      const strategy = strategies.value.find(s => s.id === strategyId);
      if (strategy) {
        strategy.goals.push("");
      }
    };

    const updateGoal = (strategyId, goalIndex, value) => {
      const strategy = strategies.value.find(s => s.id === strategyId);
      if (strategy) {
        strategy.goals[goalIndex] = value;
      }
    };

    const removeGoal = (strategyId, goalIndex) => {
      const strategy = strategies.value.find(s => s.id === strategyId);
      if (strategy) {
        strategy.goals.splice(goalIndex, 1);
      }
    };

    const addStrategyItem = (strategyId) => {
      const strategy = strategies.value.find(s => s.id === strategyId);
      if (strategy) {
        strategy.strategies.push("");
      }
    };

    const updateStrategyItem = (strategyId, index, value) => {
      const strategy = strategies.value.find(s => s.id === strategyId);
      if (strategy) {
        strategy.strategies[index] = value;
      }
    };

    const removeStrategyItem = (strategyId, index) => {
      const strategy = strategies.value.find(s => s.id === strategyId);
      if (strategy) {
        strategy.strategies.splice(index, 1);
      }
    };

    const toggleQuarter = (strategyId, index, quarter) => {
      const strategy = strategies.value.find(s => s.id === strategyId);
      if (strategy) {
        const quarters = strategy.strategyQuarters[index] || [];
        const qIndex = quarters.indexOf(quarter);
        if (qIndex > -1) {
          quarters.splice(qIndex, 1);
        } else {
          quarters.push(quarter);
        }
        strategy.strategyQuarters[index] = quarters;
      }
    };

    const updateMeasure = (strategyId, quarter, value) => {
      const strategy = strategies.value.find(s => s.id === strategyId);
      if (strategy) {
        strategy.measures[quarter] = value;
      }
    };

    const addProjectOwner = (strategyId) => {
      const strategy = strategies.value.find(s => s.id === strategyId);
      if (strategy) {
        strategy.projectOwner.push("");
      }
    };

    const updateProjectOwner = (strategyId, index, value) => {
      const strategy = strategies.value.find(s => s.id === strategyId);
      if (strategy) {
        strategy.projectOwner[index] = value;
      }
    };

    const removeProjectOwner = (strategyId, index) => {
      const strategy = strategies.value.find(s => s.id === strategyId);
      if (strategy) {
        strategy.projectOwner.splice(index, 1);
      }
    };

    return {
      expandedRows,
      strategies,
      editingStrategy,
      toggleRow,
      getMeasureColor,
      getInitials,
      addNewStrategy,
      updateStrategy,
      deleteStrategy,
      confirmDelete,
      addGoal,
      updateGoal,
      removeGoal,
      addStrategyItem,
      updateStrategyItem,
      removeStrategyItem,
      toggleQuarter,
      updateMeasure,
      addProjectOwner,
      updateProjectOwner,
      removeProjectOwner
    };
  }
};
</script>

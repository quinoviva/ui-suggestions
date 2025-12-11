<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-white">Part II. Essential Functions (EF)</h2>
          <p class="text-white text-sm mt-1">Based on JD (1-5)</p>
        </div>
        <button
          @click="addNewEF"
          class="px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2"
        >
          <span class="text-xl">+</span>
          Add New Function
        </button>
      </div>
    </div>

    <div class="p-6 space-y-6">
      <div 
        v-for="ef in essentialFunctions" 
        :key="ef.id" 
        class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
      >
        <!-- Card Header -->
        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-4 border-b border-gray-200">
          <div class="flex items-start gap-4">
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 flex-shrink-0">
              {{ ef.id }}
            </span>
            <div class="flex-1">
              <div class="text-xs text-gray-600 mb-1">Key Result Area (KRA)</div>
              <input
                v-if="editingEF === ef.id"
                type="text"
                :value="ef.kra"
                @input="updateEF(ef.id, 'kra', $event.target.value)"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                placeholder="Enter Key Result Area..."
              />
              <h3 v-else class="text-gray-900">{{ ef.kra }}</h3>
            </div>
            <div class="flex gap-2">
              <button
                @click="editingEF = editingEF === ef.id ? null : ef.id"
                class="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
              >
                {{ editingEF === ef.id ? 'Done' : 'Edit' }}
              </button>
              <button
                @click="deleteEF(ef.id)"
                class="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-4 space-y-4">
          <!-- Specific Objectives -->
          <div class="bg-blue-50 rounded-lg p-4">
            <div class="text-sm text-gray-600 mb-2">Specific Objectives (SO) & Completion Dates</div>
            <textarea
              v-if="editingEF === ef.id"
              :value="ef.specificObjectives"
              @input="updateEF(ef.id, 'specificObjectives', $event.target.value)"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              rows="3"
              placeholder="Enter specific objectives and completion dates..."
            ></textarea>
            <p v-else class="text-gray-900">{{ ef.specificObjectives || "No objectives set" }}</p>
          </div>

          <!-- KPIs -->
          <div class="space-y-4">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-sm text-gray-700">Key Performance Indicators</h4>
              <button
                v-if="editingEF === ef.id"
                @click="addKPI(ef.id)"
                class="text-xs text-green-600 hover:text-green-700"
              >
                + Add KPI
              </button>
            </div>
            <div v-for="(kpi, kpiIndex) in ef.kpis" :key="kpiIndex" class="border border-gray-200 rounded-lg overflow-hidden">
              <!-- KPI Header -->
              <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div class="flex items-start gap-2">
                  <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex-shrink-0">
                    {{ kpiIndex + 1 }}
                  </span>
                  <div class="flex-1 space-y-2">
                    <template v-if="editingEF === ef.id">
                      <input
                        type="text"
                        :value="kpi.type"
                        @input="updateKPI(ef.id, kpiIndex, 'type', $event.target.value)"
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        placeholder="Enter KPI type (e.g., Quantitative KPI)..."
                      />
                      <input
                        type="text"
                        :value="kpi.description"
                        @input="updateKPI(ef.id, kpiIndex, 'description', $event.target.value)"
                        class="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
                        placeholder="Enter KPI description..."
                      />
                    </template>
                    <template v-else>
                      <div class="text-gray-900">{{ kpi.type }}</div>
                      <div class="text-gray-600 text-xs">{{ kpi.description }}</div>
                    </template>
                  </div>
                  <button
                    v-if="editingEF === ef.id && ef.kpis.length > 1"
                    @click="removeKPI(ef.id, kpiIndex)"
                    class="text-red-600 hover:text-red-700 text-xs px-2 py-1"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <!-- Annual Expectations -->
              <div class="grid grid-cols-1 md:grid-cols-3">
                <!-- Below Expectation -->
                <div class="p-4 bg-red-50 border-r border-gray-200">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <span class="text-sm text-gray-900">Below Expectation</span>
                  </div>
                  <textarea
                    v-if="editingEF === ef.id"
                    :value="kpi.belowExpectation"
                    @input="updateKPI(ef.id, kpiIndex, 'belowExpectation', $event.target.value)"
                    class="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-red-500 bg-white"
                    rows="3"
                    placeholder="Enter criteria for below expectation..."
                  ></textarea>
                  <p v-else class="text-xs text-gray-700">{{ kpi.belowExpectation || "N/A" }}</p>
                </div>

                <!-- Meets Expectation -->
                <div class="p-4 bg-yellow-50 border-r border-gray-200">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span class="text-sm text-gray-900">Meets Expectation</span>
                  </div>
                  <textarea
                    v-if="editingEF === ef.id"
                    :value="kpi.meetsExpectation"
                    @input="updateKPI(ef.id, kpiIndex, 'meetsExpectation', $event.target.value)"
                    class="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-yellow-500 bg-white"
                    rows="3"
                    placeholder="Enter criteria for meets expectation..."
                  ></textarea>
                  <p v-else class="text-xs text-gray-700">{{ kpi.meetsExpectation || "N/A" }}</p>
                </div>

                <!-- Exceeds Expectation -->
                <div class="p-4 bg-green-50">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    <span class="text-sm text-gray-900">Exceeds Expectation</span>
                  </div>
                  <textarea
                    v-if="editingEF === ef.id"
                    :value="kpi.exceedsExpectation"
                    @input="updateKPI(ef.id, kpiIndex, 'exceedsExpectation', $event.target.value)"
                    class="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
                    rows="3"
                    placeholder="Enter criteria for exceeds expectation..."
                  ></textarea>
                  <p v-else class="text-xs text-gray-700">{{ kpi.exceedsExpectation || "N/A" }}</p>
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

export default {
  setup() {
    const essentialFunctionsData = [
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

    const essentialFunctions = ref(essentialFunctionsData);
    const editingEF = ref(null);

    const addNewEF = () => {
      const newEF = {
        id: essentialFunctions.value.length + 1,
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
      essentialFunctions.value.push(newEF);
      editingEF.value = newEF.id;
    };

    const updateEF = (id, field, value) => {
      const ef = essentialFunctions.value.find(ef => ef.id === id);
      if (ef) {
        ef[field] = value;
      }
    };

    const deleteEF = (id) => {
      if (confirm('Are you sure you want to delete this Essential Function?')) {
        essentialFunctions.value = essentialFunctions.value.filter(ef => ef.id !== id);
      }
    };

    const addKPI = (efId) => {
      const ef = essentialFunctions.value.find(ef => ef.id === efId);
      if (ef) {
        ef.kpis.push({
          type: "",
          description: "",
          belowExpectation: "",
          meetsExpectation: "",
          exceedsExpectation: ""
        });
      }
    };

    const updateKPI = (efId, kpiIndex, field, value) => {
      const ef = essentialFunctions.value.find(ef => ef.id === efId);
      if (ef) {
        ef.kpis[kpiIndex][field] = value;
      }
    };

    const removeKPI = (efId, kpiIndex) => {
      const ef = essentialFunctions.value.find(ef => ef.id === efId);
      if (ef) {
        ef.kpis.splice(kpiIndex, 1);
      }
    };

    return {
      essentialFunctions,
      editingEF,
      addNewEF,
      updateEF,
      deleteEF,
      addKPI,
      updateKPI,
      removeKPI
    };
  }
};
</script>

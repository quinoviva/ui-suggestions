<template>
  <div class="max-w-7xl mx-auto p-6 space-y-6">
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center gap-2 mb-6">
        <FileText class="w-6 h-6 text-blue-600" />
        <h1 class="text-gray-900">Performance Expectation Form</h1>
      </div>
      
      <!-- Form Metadata -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-gray-600 text-sm">
            <Calendar class="w-4 h-4" />
            Period
          </label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                v-model="formType"
                value="semi-annual"
                class="w-4 h-4 text-blue-600"
              />
              <span class="text-gray-700">Semi-Annual</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                v-model="formType"
                value="annual"
                class="w-4 h-4 text-blue-600"
              />
              <span class="text-gray-700">Annual</span>
            </label>
          </div>
        </div>

        <div class="space-y-2">
          <label class="flex items-center gap-2 text-gray-600 text-sm">
            Remarks
          </label>
          <input
            type="text"
            v-model="remarks"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter remarks"
          />
        </div>

        <div class="space-y-2">
          <label class="flex items-center gap-2 text-gray-600 text-sm">
            <Building2 class="w-4 h-4" />
            Department/Division
          </label>
          <select
            v-model="department"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option v-for="dept in departments" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>
        </div>

        <div class="space-y-2">
          <label class="flex items-center gap-2 text-gray-600 text-sm">
            <Briefcase class="w-4 h-4" />
            Assignment
          </label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                v-model="assignment"
                value="Central Office"
                class="w-4 h-4 text-blue-600"
              />
              <span class="text-gray-700">Central Office</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                v-model="assignment"
                value="Field"
                class="w-4 h-4 text-blue-600"
              />
              <span class="text-gray-700">Field</span>
            </label>
          </div>
        </div>
      </div>

      <div class="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200">
        <p class="text-sm text-gray-700">
          <span class="text-gray-900">Instructions:</span> Fill up the portion of the Departmental Performance Expectation Form (DPE) and discuss in detail the Objectives, Goals, Strategies and the Measures per quarter both in your 1 and your LT/s for the Breakthrough Strategies (BS) and agree where you are as of period time. Please make sure to list all direct contribution to achieve the intended results even if there is already an assigned person on the specific KRA. Please also note that an assigned KRA does not limit you to assigned functions, but you do, allow room to strengthen the required capabilities before submitting to HRD.
        </p>
      </div>
    </div>

    <BreakthroughStrategies />
    <EssentialFunctions />

    <!-- Action Buttons -->
    <div class="flex justify-end gap-3">
      <button class="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
        Save as Draft
      </button>
      <button class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { FileText, Calendar, Building2, Briefcase } from 'lucide-vue-next';
import BreakthroughStrategies from './BreakthroughStrategies.vue';
import EssentialFunctions from './EssentialFunctions.vue';

export default {
  components: {
    FileText,
    Calendar,
    Building2,
    Briefcase,
    BreakthroughStrategies,
    EssentialFunctions
  },
  setup() {
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

    const formType = ref('semi-annual');
    const remarks = ref('');
    const department = ref('IRCTO');
    const assignment = ref('Central Office');

    return {
      departments,
      formType,
      remarks,
      department,
      assignment
    };
  }
};
</script>

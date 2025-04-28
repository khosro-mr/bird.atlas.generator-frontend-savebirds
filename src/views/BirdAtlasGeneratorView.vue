<template>
  <div class="container py-4">
    <!-- Explanation Section -->
    <section class="mb-4">
      <h1 class="text-center fw-bold mb-3">Bird Atlas Generator</h1>
      <div class="lead">
        <p>The Bird Atlas Generator is a powerful tool that allows you to create comprehensive bird distribution maps for specific geographic areas and time periods. By analyzing historical bird observation data from 1966 to the present, you can gain valuable insights for conservation planning and research.</p>
        <p>Simply select your desired time period, choose a geographic boundary, and click the generate button to visualize bird distribution patterns. These atlases can help identify critical habitats, migration corridors, and population trends to inform conservation efforts.</p>
      </div>
    </section>

    <div class="row">
      <!-- Form Inputs Section -->
      <section class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-3">Select Data Parameters</h5>
            <form @submit.prevent="generateMap">
              <!-- Year Selection -->
              <div class="mb-3">
                <label for="startYear" class="form-label">Start year</label>
                <select id="startYear" class="form-select" v-model="startYear" @change="validateYears">
                  <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="endYear" class="form-label">End year</label>
                <select id="endYear" class="form-select" v-model="endYear">
                  <option v-for="year in endYearOptions" :key="year" :value="year">{{ year }}</option>
                </select>
              </div>

              <!-- Geographic Area Selection -->
              <div class="mb-3">
                <label class="form-label">Geographic Area</label>
                <div class="d-flex flex-column gap-2">
                  <div class="form-check" v-for="(option, index) in geoAreaOptions" :key="index">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      :id="`geoArea${index}`" 
                      :value="option" 
                      v-model="geographicArea"
                      name="geoAreaRadio"
                    >
                    <label class="form-check-label" :for="`geoArea${index}`">
                      {{ option }}
                    </label>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="btn btn-success d-flex align-items-center">
                <span>Click</span>
                <i class="ms-2">✓</i>
              </button>
            </form>
          </div>
        </div>
      </section>

      <!-- Map Viewer Section -->
      <section class="col-md-8 mb-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title mb-3">Map Viewer</h5>
            <div id="map-container" ref="mapContainer" class="flex-grow-1" style="min-height: 400px;"></div>
            <div class="d-flex justify-content-end mt-3">
              <button 
                class="btn btn-warning d-flex align-items-center" 
                @click="generateResults"
                :disabled="!mapReady"
              >
                <i class="me-2">←</i>
                <span>Click to get results!</span>
              </button>
            </div>
            <div class="mt-2 text-end small text-muted">
              Leaflet | Data by OpenStreetMap, under ODbL
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed, onBeforeUnmount, watch } from 'vue';
import L from 'leaflet';

export default {
  name: 'BirdAtlasGeneratorView',
  setup() {
    const mapContainer = ref(null);
    const map = ref(null);
    const currentYear = new Date().getFullYear();
    const startYear = ref(1966);
    const endYear = ref(currentYear);
    const geographicArea = ref('BCR');
    const isLoading = ref(false);
    const mapReady = ref(false);
    const resultsReady = ref(false);
    
    // Generate array of years from 1966 to current year
    const availableYears = computed(() => {
      const years = [];
      for (let year = 1966; year <= currentYear; year++) {
        years.push(year);
      }
      return years;
    });
    
    // End year options should be >= start year
    const endYearOptions = computed(() => {
      return availableYears.value.filter(year => year >= startYear.value);
    });
    
    const geoAreaOptions = [
      'BCR', 
      'LCC', 
      'USA', 
      'Canada', 
      'Greater Sage-Grouse habitat', 
      'Custom Shapefile'
    ];
    
    // Ensure end year is never less than start year
    const validateYears = () => {
      if (endYear.value < startYear.value) {
        endYear.value = startYear.value;
      }
    };
    
    // Initialize map
    onMounted(() => {
      // Create map instance
      if (mapContainer.value) {
        map.value = L.map(mapContainer.value).setView([39.8283, -98.5795], 4);
        
        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map.value);
        
        // Add default boundaries based on geographic area
        updateMapBoundaries();
        
        mapReady.value = true;
      }
    });
    
    // Clean up map instance when component is destroyed
    onBeforeUnmount(() => {
      if (map.value) {
        map.value.remove();
      }
    });
    
    // Update map when geographic area changes
    watch(geographicArea, () => {
      updateMapBoundaries();
    });
    
    // Update map boundaries based on selected geographic area
    const updateMapBoundaries = () => {
      if (!map.value) return;
      
      // Clear existing boundaries
      map.value.eachLayer(layer => {
        if (layer instanceof L.GeoJSON) {
          map.value.removeLayer(layer);
        }
      });
      
      // Mock boundaries based on selection
      // In a real implementation, this would load real GeoJSON data
      const mockBoundaries = {
        'BCR': [
          [47.116386, -122.846833],
          [42.891308, -112.935883],
          [35.358591, -115.559692],
          [42.152981, -123.481079]
        ],
        'LCC': [
          [48.164514, -124.537236],
          [41.810994, -114.034072],
          [36.989983, -117.139156],
          [44.002482, -124.213824]
        ],
        'USA': [
          [49.384358, -124.733269],
          [49.384358, -66.949895],
          [25.837377, -66.949895],
          [25.837377, -124.733269]
        ],
        'Canada': [
          [69.768712, -140.976195],
          [69.768712, -52.643195],
          [41.679865, -52.643195],
          [41.679865, -140.976195]
        ],
        'Greater Sage-Grouse habitat': [
          [47.762179, -119.310884],
          [38.411646, -108.744478],
          [35.978005, -116.136080],
          [43.777152, -121.112642]
        ],
        'Custom Shapefile': [
          [45.000000, -110.000000],
          [40.000000, -100.000000],
          [35.000000, -105.000000],
          [38.000000, -115.000000]
        ]
      };
      
      // Add polygon to map
      if (mockBoundaries[geographicArea.value]) {
        L.polygon(mockBoundaries[geographicArea.value], {
          color: 'green',
          fillOpacity: 0.2,
          weight: 2
        }).addTo(map.value);
        
        // Fit map to boundary
        map.value.fitBounds(mockBoundaries[geographicArea.value]);
      }
    };
    
    // Generate the map based on form selections
    const generateMap = () => {
      isLoading.value = true;
      
      // Simulate loading
      setTimeout(() => {
        updateMapBoundaries();
        isLoading.value = false;
      }, 500);
    };
    
    // Generate the final results
    const generateResults = () => {
      resultsReady.value = true;
      // In a real application, this would trigger an API call and show results
      alert(`Bird Atlas generated for ${geographicArea.value} from ${startYear.value} to ${endYear.value}`);
    };
    
    return {
      mapContainer,
      startYear,
      endYear,
      geographicArea,
      isLoading,
      mapReady,
      resultsReady,
      availableYears,
      endYearOptions,
      geoAreaOptions,
      validateYears,
      generateMap,
      generateResults
    };
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  height: 100%;
}

#map-container {
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style> 
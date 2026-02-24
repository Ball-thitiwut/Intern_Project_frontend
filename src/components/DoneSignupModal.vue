<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-icon" :class="type">
        <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      
      <h3 class="modal-title">{{ title }}</h3>
      <p class="modal-message">{{ message }}</p>
      
      <button class="modal-btn" @click="$emit('close')">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  type: {
    type: String,
    default: 'success' 
  },
  title: String,
  message: String,
  buttonText: {
    type: String,
    default: 'OK' 
  }
});

defineEmits(['close']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

.modal-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  animation: scaleIn 0.2s ease-out;
}

.modal-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.modal-icon.success {
  background-color: #dcfce7;
  color: #16a34a;
}

.modal-icon.error {
  background-color: #fee2e2;
  color: #ef4444;
}

.modal-icon svg {
  width: 2rem;
  height: 2rem;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.modal-message {
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.modal-btn {
  background-color: #F97316;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.modal-btn:hover {
  background-color: #ea580c;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Responsive Mobile */
@media (max-width: 768px) {
  .modal-card {
    padding: 1.5rem !important; 
    width: 80% !important; 
    max-width: 320px !important; 
    border-radius: 1.5rem !important; 
  }

  .modal-icon {
    width: 3rem !important; 
    height: 3rem !important;
    margin-bottom: 0.75rem !important;
  }

  .modal-icon svg {
    width: 1.5rem !important; 
    height: 1.5rem !important;
  }

  .modal-title {
    font-size: 1.15rem !important; 
  }

  .modal-message {
    font-size: 0.9rem !important;
    margin-bottom: 1.25rem !important;
  }

  .modal-btn {
    padding: 0.6rem 1.5rem !important; 
    font-size: 0.95rem !important;
    border-radius: 9999px !important; 
    height: 38px !important; 
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
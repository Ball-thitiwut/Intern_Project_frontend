<template>
  <div class="w-full h-full px-6 md:px-10 flex flex-col">
    
    <div class="mb-6 flex-none">
      <h1 class="text-3xl font-bold text-[#051960] tracking-tight mb-3">
        เชื่อมต่อข้อมูล POS
      </h1>
      <p class="text-gray-500 text-sm md:text-base font-light">
        เลือกเชื่อมต่อข้อมูลกับ POS ที่คุณใช้งาน หรือ <span class="text-[#F97316] font-medium">รับฟรี! POS</span>
        เมื่อเลือกใช้งาน RESSELF POS
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full flex-1 min-h-0 pb-14">
      
      <div class="group relative bg-white rounded-[2rem] w-full h-full flex flex-col items-center pb-10 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#F97316] overflow-hidden">
        
        <div class="absolute top-0 w-full h-1/2 bg-gradient-to-b from-orange-50 to-transparent opacity-60 z-0"></div>
        
        <div class="flex-grow flex flex-col justify-center items-center z-10 px-6 text-center">
            
            <div class="mb-6 transform group-hover:scale-110 transition-transform duration-300">
               <div class="w-32 h-32 bg-orange-100 text-6xl flex items-center justify-center rounded-full shadow-inner mx-auto">
                 👨‍🍳
               </div>
            </div>

            <h2 class="text-2xl font-bold text-[#051960] mb-2">RESSELF POS</h2>
            <p class="text-gray-500 font-light">
              ระบบจัดการร้านอาหารที่มาพร้อม AI<br>
              ช่วยวิเคราะห์ยอดขายและจัดการสต็อกฟรี
            </p>
        </div>

        <button
          @click="showMyOwnModal = true"
          class="z-10 bg-[#F97316] text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg hover:bg-[#ea580c] active:scale-95 transition-all duration-200 w-auto min-w-[200px]"
        >
          เชื่อมกับ RESSELF POS
        </button>
      </div>

      <div class="group relative bg-white rounded-[2rem] w-full h-full flex flex-col items-center pb-10 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 overflow-hidden">
        
        <div class="absolute top-0 w-full h-1/2 bg-gradient-to-b from-blue-50 to-transparent opacity-60 z-0"></div>
        
        <div class="flex-grow flex flex-col justify-center items-center z-10 px-6 text-center">
            
            <div class="mb-6 transform group-hover:scale-110 transition-transform duration-300">
               <div class="w-32 h-32 bg-blue-100 text-6xl flex items-center justify-center rounded-full shadow-inner mx-auto">
                 🔌
               </div>
            </div>

            <h2 class="text-2xl font-bold text-[#051960] mb-2">POS อื่น / My Own POS</h2>
            <p class="text-gray-500 font-light">
              ดึงข้อมูลยอดขายจากระบบ POS เดิมของคุณ<br>
              รองรับ Ocha, Wongnai และอื่นๆ
            </p>
        </div>

        <button
          @click="handleConnectOther"
          class="z-10 bg-white text-[#051960] border-2 border-[#051960] font-bold text-lg py-3 px-10 rounded-full shadow-sm hover:bg-[#051960] hover:text-white active:scale-95 transition-all duration-200 w-auto min-w-[200px]"
        >
          เชื่อมกับ POS อื่น
        </button>
      </div>

    </div>

    <Teleport to="body">
      <ConnectPosModal
        v-if="showMyOwnModal"
        @close="showMyOwnModal = false"
        @submit="handleFormSubmit"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ConnectPosModal from "@/components/ConnectPosModal.vue";

const router = useRouter();
const showMyOwnModal = ref(false);

const handleConnectOther = () => {
  router.push({ name: "select-pos" });
};

const handleFormSubmit = async (formData) => {
  showMyOwnModal.value = false;
  
  router.push({ 
    name: "branch-connect", 
    query: { posType: "resself", posName: "RESSELF POS" } 
  });
};
</script>
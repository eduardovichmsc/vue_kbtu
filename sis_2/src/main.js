import { createApp } from 'vue'
import './style.css'
import App from './app.vue'
import Modal from './components/ui/modal.vue'
import Select from './components/ui/select.vue'

const app = createApp(App)
app.component('Modal', Modal)
app.component('Select', Select)
app.mount('#app')

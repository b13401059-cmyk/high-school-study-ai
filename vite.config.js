import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/high-school-study-ai/', // 👈 關鍵：這裡要跟你的 Repo 名稱一樣
})
import { ElectronHandler } from '../main/preload'
// preload.d.ts 文件的作用就是为 Electron 渲染器进程中的 preload 脚本提供类型定义，使得开发者在编写 TypeScript 代码时能够更加方便地与主进程进行通信，以及避免一些潜在的类型错误
declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		electron: ElectronHandler
	}
}

export {}

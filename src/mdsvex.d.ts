declare module 'mdsvex' {
	export interface CompileOptions {
		[key: string]: any;
	}

	export interface CompileResult {
		code: string;
		data?: any;
		[key: string]: any;
	}

	export function compile(markdown: string, options?: CompileOptions): Promise<CompileResult>;

	export function preprocess(): any;
}

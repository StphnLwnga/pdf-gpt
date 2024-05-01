import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { LoadError } from '@react-pdf-viewer/core';
import { MdBrokenImage } from "react-icons/md";


const ErrorLoadingPDF = ({ error, resolvedTheme }: { error: LoadError, resolvedTheme?: string, }) => {
	const isDark = resolvedTheme === 'dark';

	return (<div className="p-1 h-full w-full">
		<Skeleton className="h-full w-full flex flex-col items-center justify-center p-4 gap-y-4" >
			<div><MdBrokenImage className={cn('lg:text-8xl md:text-5xl', !isDark && 'text-slate-300' )} /></div>
			<div className={cn("text-2xl font-bold", !isDark && 'text-slate-500' )}>Error Loading PDF...</div>
			{/* <p className={cn("text-sm italic", !isDark && 'text-slate-500' )}>{error.message}</p> */}
			<p className={cn("text-sm italic", !isDark && 'text-slate-500' )}>Could not get document</p>
		</Skeleton>
	</div>);
};

export default ErrorLoadingPDF;
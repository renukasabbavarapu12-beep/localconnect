export default function LoadingState({ text = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-500 font-medium">{text}</p>
      </div>
    </div>
  );
}

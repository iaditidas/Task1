import React from 'react';

export default function SectionStateStatus({ loading, error, onRetry }) {
  if (loading) {
    return (
      <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#D8C3A5] text-[#6F4E37] text-center my-8 flex flex-col items-center justify-center gap-3 shadow-sm">
        <div className="w-8 h-8 border-3 border-[#6F4E37] border-t-transparent rounded-full animate-spin" />
        <span className="font-heading font-medium text-base text-[#6F4E37]">
          Fetching information...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-rose-300 text-[#6F4E37] text-center my-8 flex flex-col items-center justify-center gap-3 shadow-sm">
        <span className="font-heading font-bold text-lg text-rose-700">
          failed to fetch the information
        </span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-5 py-2 rounded-full bg-[#6F4E37] text-white text-xs font-semibold hover:bg-[#523927] transition-all shadow-sm"
          >
            Retry Fetch
          </button>
        )}
      </div>
    );
  }

  return null;
}

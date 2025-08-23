import type { TConvertedForm } from '@stores/form-information-store';

export function InformationCard({
  data,
  isLast,
}: {
  data: TConvertedForm;
  isLast: boolean;
}) {
  return (
    <div
      className={`border-white border-2 rounded-3xl w-60 h-80 p-3  ${isLast ? 'bg-slate-500' : 'bg-slate-800'}`}
    >
      <ul>
        {data ? (
          Object.entries(data).map(([key, value]) => {
            if (key === 'picture') return;
            return (
              <li key={key} id={key} className="w-full break-words">
                <b>{key}</b>: {value}
              </li>
            );
          })
        ) : (
          <span>information is lost</span>
        )}
      </ul>
    </div>
  );
}

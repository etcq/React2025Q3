import type { TConvertedForm } from '@stores/form-information-store';

export function InformationCard({ data }: { data: TConvertedForm }) {
  return (
    <div className="border-white border-2 rounded-b-3xl w-60 h-80 p-3">
      <ul>
        {data ? (
          Object.entries(data).map(([key, value]) => {
            if (key === 'picture') return;
            return (
              <li key={key} id={key} className=" w-full break-words">
                {value}
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

export function GenderPicker() {
  return (
    <div className="border-1 border-slate-200 p-2 rounded flex justify-center gap-10">
      <div>
        <input
          type="radio"
          id="man"
          name="gender"
          className="appearance-none bg-slate-200 w-3 h-3 rounded-full checked:border-3 checked:border-fuchsia-400 checked:bg-slate-900 mr-1"
        />
        <label htmlFor="man">Man</label>
      </div>
      <div>
        <input
          type="radio"
          id="woman"
          name="gender"
          className="appearance-none bg-slate-200 w-3 h-3 rounded-full checked:border-3 checked:border-fuchsia-400 checked:bg-slate-900 mr-1"
        />
        <label htmlFor="woman">Woman</label>
      </div>
    </div>
  );
}

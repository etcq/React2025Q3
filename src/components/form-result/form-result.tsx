import { button } from '@style/classes';
import { useFormInformationStore } from '@stores/form-information-store';
import { useModalControl } from '@stores/modal-control-store';
import { InformationCard } from '../information-card/information-card';
import { FormControlled } from '../form/controlled-form';
import { Modal } from '../modal/Modal';
import { useState } from 'react';
import { UncontrolledForm } from '../form/uncontrolled-form';

export function FormResult() {
  const information = useFormInformationStore((state) => state.information);
  const setIsShown = useModalControl((state) => state.setIsShown);
  const [form, setForm] = useState(<FormControlled />);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-center text-5xl">Form results</h1>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setForm(<FormControlled />);
          setIsShown(true);
        }}
        className={`${button} w-100`}
      >
        Open Controlled Form
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setForm(<UncontrolledForm />);
          setIsShown(true);
        }}
        className={`${button} w-100`}
      >
        Open Uncontrolled Form
      </button>
      <div className="flex flex-row flex-wrap gap-4 justify-center p-5">
        {information.map((information, index) => (
          <InformationCard
            data={information}
            key={index}
            isLast={index === 0}
          />
        ))}
      </div>
      <Modal>{form}</Modal>
    </div>
  );
}

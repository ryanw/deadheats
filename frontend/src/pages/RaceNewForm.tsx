import { useCallback, useState } from 'react';
import { RaceInput, useMutation } from '../api';
import { RaceForm, SubmitEventHandler } from './RaceForm';

const DEFAULT_INPUT: RaceInput = {
  name: '',
  lanes: [
    { name: 'Lane 1' },
    { name: 'Lane 2' },
  ],
};

export default function RaceNewForm() {
  const [race, setRace] = useState<RaceInput>(DEFAULT_INPUT);
  const mutation = useMutation('post', '/races');
  const { mutate, error } = mutation;

  const onSubmit: SubmitEventHandler = useCallback((_, changes) => {
    mutate({
      body: { race: changes },
    });
  }, []);

  return <RaceForm input={race} error={error} onSubmit={onSubmit} onChange={(_, changes) => setRace(changes)} />;
}

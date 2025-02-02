import { useCallback, useEffect, useState } from 'react';
import { RaceInput, useMutation } from '../api';
import { RaceForm, SubmitEventHandler } from './RaceForm';
import { useNavigate } from 'react-router-dom';

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
  const { mutate, error, isSuccess } = mutation;
  const navigate = useNavigate();

  const onSubmit: SubmitEventHandler = useCallback((_, changes) => {
    mutate({
      body: { race: changes },
    });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  return <RaceForm input={race} error={error} onSubmit={onSubmit} onChange={(_, changes) => setRace(changes)} />;
}

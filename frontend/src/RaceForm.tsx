import { useQuery } from './api';

export default RaceForm;

export interface RaceFormProps {
  raceId: number | string;
}

export function RaceForm(props: RaceFormProps) {
  const raceId = props.raceId.toString();
  const { data: race, error, isLoading } = useQuery('get', '/races/{id}', { params: { path: { id: raceId } } });
  return (
    <div>
      FORM: {raceId} -- {race?.name}
    </div>
  );
}

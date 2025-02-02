import { useCallback, useEffect, useState } from 'react';
import { Competitor, CompetitorInput, Lane, LaneInput, Race, RaceInput, useMutation, useQuery } from '../api';
import { RaceForm, SubmitEventHandler } from './RaceForm';
import { useNavigate } from 'react-router-dom';

export default RaceEditForm;

export interface RaceFormProps {
  raceId: number | string;
}

export function RaceEditForm(props: RaceFormProps) {
  const navigate = useNavigate();
  const raceId = props.raceId.toString();
  const { data } = useQuery('get', '/races/{id}', { params: { path: { id: raceId } } });
  const { mutate, error, isSuccess } = useMutation('patch', '/races/{id}');
  const [changes, setChanges] = useState<RaceInput | null>(null);
  useEffect(() => {
    if (!data) {
      return;
    }
    setChanges(mapRaceToInput(data));
  }, [data]);

  // Navigate to index after saving
  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess]);

  const onSubmit: SubmitEventHandler = useCallback((_, changes) => {
    mutate({
      params: { path: { id: raceId } },
      body: { race: changes },
    });
  }, [raceId]);

  return (
    changes
      ? <RaceForm input={changes} error={error} onSubmit={onSubmit} onChange={(_, changes) => setChanges(changes)} />
      : <div>Loading...</div>
  );
}

function mapRaceToInput(race: Race): RaceInput {
  return {
    name: race.name,
    lanes: race.lanes.map(mapLaneToInput),
  };
}

function mapLaneToInput(lane: Lane): LaneInput {
  const input: LaneInput = {
    id: lane.id,
    name: lane.name,
  };

  if (lane.competitor) {
    input.competitor = mapCompetitorToInput(lane.competitor);
  }

  return input;
}

function mapCompetitorToInput(competitor: Competitor): CompetitorInput {
  return {
    id: competitor.id,
    name: competitor.name,
    position: competitor.position
  };
}


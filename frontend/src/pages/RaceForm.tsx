import { useCallback, useState } from 'react';
import { CompetitorInput, LaneInput, RaceInput } from '../api';
import styles from './RaceForm.module.css';

const DEFAULT_COMPETITOR: CompetitorInput = {
  name: '',
};

const DEFAULT_LANE: LaneInput = {
  name: '',
};

export type ChangeEventHandler = (e: React.SyntheticEvent, changes: RaceInput) => void;
export type SubmitEventHandler = (e: React.FormEvent, changes: RaceInput) => void;

export interface RaceFormProps {
  input: RaceInput;
  error?: object | null;
  onChange: ChangeEventHandler;
  onSubmit: SubmitEventHandler;
}

export function RaceForm({ input, error, onChange, onSubmit }: RaceFormProps) {
  const [laneAdded, setLaneAdded] = useState(false);

  const indexedLanes = input.lanes.map((lane, i) => [lane, i] as [LaneInput, number]);
  const activeLanes = indexedLanes.filter(([lane]) => lane.name !== null);
  const laneCount = activeLanes.length;
  const focusName = !laneAdded && input.name == '';
  const focusLane = laneAdded;

  const onChangeInput = useCallback((e: React.ChangeEvent) => {
    const el = e.target as HTMLInputElement;
    const key = el.name;
    const value = el.type === 'number' ? parseInt(el.value, 10) : el.value;
    onChange(e, { ...input, [key]: value });
  }, [input, onChange]);

  const onChangeCompetitorInput = useCallback((e: React.SyntheticEvent, laneIndex: number) => {
    const el = e.target as HTMLInputElement;
    const key = el.name;
    const value = el.type === 'number' ? parseInt(el.value, 10) : el.value;
    const newLanes = [...input.lanes];
    newLanes[laneIndex] = {
      ...newLanes[laneIndex],
      competitor: {
        ...(newLanes[laneIndex].competitor || DEFAULT_COMPETITOR),
        [key]: value,
      }
    };
    onChange(e, { ...input, lanes: newLanes });
  }, [input, onChange]);

  const onSubmitForm = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e, input);
  }, [input, onSubmit]);

  const onClickAddLane = useCallback((e: React.SyntheticEvent) => {
    const newLanes = updateLaneNames([...input.lanes, { ...DEFAULT_LANE }]);
    onChange(e, { ...input, lanes: newLanes });
    setLaneAdded(true);
  }, [input]);

  const onClickRemoveLane = useCallback((e: React.SyntheticEvent, index: number) => {
    if (confirm(`Are you sure you want to remove ${input.lanes[index]?.name}?`)) {
      let newLanes = [...input.lanes];
      newLanes[index].name = null;
      newLanes = updateLaneNames(newLanes);
      onChange(e, { ...input, lanes: newLanes });
    }
  }, [input]);

  return (
    <div className={styles.form}>
      <h1>{input.name.toString().trim() || 'Untitled race'}</h1>
      <form onSubmit={onSubmitForm}>
        <p>Name your race and add as many lanes as required.</p>
        <div className={styles.toolbar}>
          <button type="button" onClick={onClickAddLane}>Add Lane</button>
          <button type="submit">Save</button>
        </div>

        <ErrorMessage error={error} />
        <div>
          <label htmlFor="race-name">Race Name</label>
          <input autoFocus={focusName} id="race-name" type="text" name="name" value={input.name} onChange={onChangeInput} />
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Competitor</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {activeLanes.map(([lane, i]) =>
              <tr key={lane.id ?? `lane-${i}`}>
                <td><label htmlFor={`lane-${i}`}>{lane.name}</label></td>
                <td><input id={`lane-${i}`} autoFocus={focusLane && i === activeLanes.length - 1} name="name" value={lane.competitor?.name ?? ""} onChange={(e) => onChangeCompetitorInput(e, i)} /></td>
                <td><input name="position" type="number" step="1" min="1" max={laneCount} value={lane.competitor?.position ?? ""} onChange={(e) => onChangeCompetitorInput(e, i)} /></td>
                <td><button type="button" onClick={(e) => onClickRemoveLane(e, i)}>Remove</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export interface ErrorMessageProps {
  error?: object | null;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) {
    return null;
  }

  return (
    <p className={styles.error}>
      Error: {formatErrorMessage(error)}
    </p>
  );
}

function updateLaneNames(lanes: LaneInput[]): LaneInput[] {
  let i = 0;
  return lanes.map((lane) => {
    const isDeleted = lane.name === null;
    if (!isDeleted) {
      i += 1;
    }
    return {
      ...lane,
      // Nulls are deleted lanes
      name: isDeleted ? null : `Lane ${i}`,
    }
  });
}

function formatErrorMessage(error: object): string {
  if ('error' in error && typeof error.error === 'string') {
    return error.error;
  }

  if ('name' in error) {
    return 'Race requires a nane';
  }

  if ('lanes.competitor' in error || 'lanes.competitor.name' in error) {
    return 'Every lane requires a competitor';
  }

  if ('competitor.position' in error) {
    const [msg] = error['competitor.position'] as string[];
    return 'Position ' + msg;
  }

  if ('lanes' in error) {
    const [msg] = error['lanes'] as string[];
    return 'Lanes: ' + msg;
  }

  return 'Unknown Error';
}

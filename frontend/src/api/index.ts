import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths, components } from './schema';

export type Race = components["schemas"]["Race"];
export type Lane = components["schemas"]["Lane"];
export type Competitor = components["schemas"]["Competitor"];
export type RaceInput = components["schemas"]["RaceInput"];
export type LaneInput = components["schemas"]["LaneInput"];
export type CompetitorInput = components["schemas"]["CompetitorInput"];

const fetchClient = createFetchClient<paths>({
  baseUrl: '/api',
});

const { useQuery, useMutation } = createClient(fetchClient);
export { useQuery, useMutation };

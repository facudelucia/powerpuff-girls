import showReducer, { ShowState, fetchShowDetails, fetchEpisodes, selectEpisode } from './showSlice';
import { Show, Episode } from '../types/showTypes';

describe('showSlice Reducer', () => {
  const initialState: ShowState = {
    show: null,
    episodes: [],
    selectedEpisode: null,
    status: 'idle',
  };

  it('should handle initial state', () => {
    expect(showReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchShowDetails.pending', () => {
    const action = { type: fetchShowDetails.pending.type };
    const state = showReducer(initialState, action);
    expect(state.status).toBe('loading');
  });

  it('should handle fetchShowDetails.fulfilled', () => {
    const show: Show = { id: 1, name: 'Powerpuff Girls', summary: 'A show about superheroes', image: { medium: 'medium-image-url', original: 'image-url' } };
    const action = { type: fetchShowDetails.fulfilled.type, payload: show };
    const state = showReducer(initialState, action);
    expect(state.status).toBe('idle');
    expect(state.show).toEqual(show);
  });

  it('should handle fetchEpisodes.fulfilled', () => {
    const episodes: Episode[] = [
      { id: 1, name: 'Episode 1', summary: 'Summary 1', image: { medium: 'medium-image-url-1', original: 'image-url-1' } },
      { id: 2, name: 'Episode 2', summary: 'Summary 2', image: { medium: 'medium-image-url-2', original: 'image-url-2' } },
    ];
    const action = { type: fetchEpisodes.fulfilled.type, payload: episodes };
    const state = showReducer(initialState, action);
    expect(state.episodes).toEqual(episodes);
  });

  it('should handle selectEpisode', () => {
    const episodes: Episode[] = [
      { id: 1, name: 'Episode 1', summary: 'Summary 1', image: { medium: 'medium-image-url-1', original: 'image-url-1' } },
      { id: 2, name: 'Episode 2', summary: 'Summary 2', image: { medium: 'medium-image-url-2', original: 'image-url-2' } },
    ];
    const stateWithEpisodes = { ...initialState, episodes };

    const action = { type: selectEpisode.type, payload: 1 };
    const state = showReducer(stateWithEpisodes, action);
    expect(state.selectedEpisode).toEqual(episodes[0]);
  });

  it('should handle selectEpisode when episode not found', () => {
    const episodes: Episode[] = [
      { id: 1, name: 'Episode 1', summary: 'Summary 1', image: { medium: 'medium-image-url-1', original: 'image-url-1' } },
    ];
    const stateWithEpisodes = { ...initialState, episodes };

    const action = { type: selectEpisode.type, payload: 2 };
    const state = showReducer(stateWithEpisodes, action);
    expect(state.selectedEpisode).toBeNull();
  });
});

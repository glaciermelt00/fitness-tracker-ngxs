export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING  = '[UI] Stop Loading';

export namespace UIAction {
  export class StartLoading {
    static readonly type = START_LOADING;
  }

  export class StopLoading {
    static readonly type = STOP_LOADING;
  }
}

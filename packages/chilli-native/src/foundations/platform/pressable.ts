import { Platform } from 'react-native';

/**
 * Snapshot of a Pressable's interaction state, as exposed by RN's render-prop child.
 * Matches RN's `PressableStateCallbackType`:
 * - `pressed` is always a boolean.
 * - `hovered` / `focused` are optional — undefined on iOS/native, boolean on Web (RN Web).
 *
 * Treat `undefined` as `false` at consumption time.
 */
export type InteractionState = {
  pressed: boolean;
  hovered?: boolean;
  focused?: boolean;
};

export type StateSlot = 'default' | 'hover' | 'pressed';

/**
 * Resolves which token slot to use for the given interaction state.
 * - `pressed` always wins.
 * - `hover` only applies on web AND when hovered/focused is explicitly true.
 * - falls back to `default`.
 */
export function resolveStateSlot(state: InteractionState): StateSlot {
  if (state.pressed) return 'pressed';
  if (Platform.OS === 'web' && (state.hovered === true || state.focused === true)) return 'hover';
  return 'default';
}

/**
 * Picks the stateful value matching the current interaction state.
 * If the requested slot is undefined on `values`, falls back to `default`.
 */
export function pickStateful<T>(
  values: { default: T; hover?: T; pressed?: T },
  state: InteractionState,
): T {
  const slot = resolveStateSlot(state);
  return values[slot] ?? values.default;
}

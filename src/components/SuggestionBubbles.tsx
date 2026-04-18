import type { Accessor, Setter } from 'solid-js';
import { For } from 'solid-js';

interface Suggestion {
	label: string;
	prompt: string;
}

interface SuggestionBubblesProps {
	suggestions: Suggestion[];
	onSuggest: (prompt: string) => void;
	disabled?: Accessor<boolean>;
}

export default function SuggestionBubbles(props: SuggestionBubblesProps) {
	return (
		<div class="flex flex-wrap gap-2">
			<For each={props.suggestions}>
				{(suggestion) => (
					<button
						type="button"
						class="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-700 transition-all duration-150 hover:border-neutral-300 hover:bg-neutral-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
						onClick={() => props.onSuggest(suggestion.prompt)}
						disabled={props.disabled?.()}
					>
						{suggestion.label}
					</button>
				)}
			</For>
		</div>
	);
}

import { ADFEntity, Formatter } from "./types";


/**
 * Formats the given ADF node using the given formatter
 * @param node @param formatter @returns Formatted object of type T
 */
 export const formatAdf = <T>(node: ADFEntity, formatter: Formatter<T>): T => {
	/*
	 * Composes the applicable mark format functions for the current node.
	 *
	 * @param content T @returns a function to mark up the node's content using
	 * the formatters mark functions for the node's marks
	 */
	const applyMarkup = (content: T) =>
		(node.marks || [])
			.map((mark) => ({
				formatterFunction: formatter.marks[node.type]?.[mark.type],
				mark,
			}))
			.reduce(
				(prev, curr) => () =>
					curr.formatterFunction?.(curr.mark, prev) || content,
				() => content,
			)();

	/*
	 * Returns a function recursing through the given node's children tree by
	 * calling itself for every child node.
	 *
	 * @param node the node to process @param formatter @returns a function to
	 * render the node's children to be used in the formatter (second parameter of
	 * NodeMapper)
	 *
	 * @returns parameter-less function to process children
	 */
	const processChildren =
		(node: ADFEntity, formatter: Formatter<T>) => (): T[] =>
			node.content // all block nodes have content
				? node.content.map((child) => formatAdf(child, formatter))
				: [];

	/*
	 * Apply the composed markup function to the curried processChildren function
	 * and return the result.
	 */
	const formatterOrDefault = formatter.nodes[node.type] || formatter.default;
	return applyMarkup(
		formatterOrDefault(node, processChildren(node, formatter)),
	);
};

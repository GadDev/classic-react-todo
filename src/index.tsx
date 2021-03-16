import React, { useState } from 'react';
import ReactDOM from 'react-dom';

type FormElement = React.FormEvent<HTMLFormElement>;
// interface create new type
interface ITodo {
	id: number;
	text: string;
	completed: boolean;
}

function randomId(): number {
	return Math.floor(Math.random() * 10000000000);
}

export default function App(): JSX.Element {
	const [value, setValue] = useState<string>('');
	const [todos, setTodos] = useState<ITodo[]>([]);

	const handleSubmit = (e: FormElement): void => {
		// don't refresh the page
		e.preventDefault();
		addTodo(value);
		setValue('');
	};

	const addTodo = (text: string): void => {
		const id: number = randomId();
		const newTodos: ITodo[] = [...todos, { id, text, completed: false }];
		setTodos(newTodos);
	};

	const completedTodo = (index: number): void => {
		const newTodos: ITodo[] = [...todos];
		newTodos[index].completed = !newTodos[index].completed;
		setTodos(newTodos);
	};
	console.log(todos);
	return (
		<React.Fragment>
			<h1>Todo List</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={value}
					onChange={(e) => setValue(e.target.value)}
					required
				/>
				<button type='submit'>Add todo</button>
			</form>
			<section>
				<ul>
					{todos.map((todo: ITodo, index: number) => (
						<React.Fragment key={todo.id}>
							{' '}
							<li
								style={{
									textDecoration: todo.completed
										? 'line-through'
										: '',
								}}
							>
								{todo.text}{' '}
								<button
									type='button'
									onClick={() => completedTodo(index)}
								>
									{todo.completed
										? 'Completed'
										: 'Incompleted'}
								</button>
							</li>
						</React.Fragment>
					))}
				</ul>
			</section>
		</React.Fragment>
	);
}

const root = document.getElementById('app-root');

ReactDOM.render(<App />, root);

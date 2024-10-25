import styled from "styled-components";
import Button from "./Button";

const StyledConfirmDelete = styled.div`
	width: 25rem;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;

	& p {
		color: var(--color-grey-500);
		margin-bottom: 1.2rem;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 15px;
	}

	& div {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
		Button {
			border: 1px solid #e5e7eb;
			border-radius: 5px;
		}
		Button:first-of-type {
			background-color: #fff;
			color: #343a40;
			&:hover {
				background-color: #f9fafb;
				color: #292929;
				border: 1px solid #e5e7eb;
			}
		}
		Button:nth-child(2) {
			background-color: #d90a0a;
			color: #f9fafb;
			&:hover {
				background-color: #c10808;
				border: 1px solid #e5e7eb;
			}
		}
	}
`;
const Heading = styled.h3`
	font-size: 2rem;
	font-weight: 500;
	font-family: "archivo";
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
	return (
		<StyledConfirmDelete>
			<Heading>Delete {resourceName}</Heading>
			<p>Are you sure you want to delete this {resourceName} permanently? This action cannot be undone.</p>

			<div>
				<Button disabled={disabled} onClick={onCloseModal}>
					Cancel
				</Button>
				<Button
					disabled={disabled}
					onClick={() => {
						onConfirm();
						document.body.style.overflow = "auto";
					}}
				>
					Delete
				</Button>
			</div>
		</StyledConfirmDelete>
	);
}

export default ConfirmDelete;

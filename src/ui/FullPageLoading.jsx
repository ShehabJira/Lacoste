import styled, { keyframes } from "styled-components";

const FullPageLoader = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100dvh;
	z-index: 10000;
	background-color: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(4px);
	div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;
const loading = keyframes`
	20% {
		background-position: 0% 0%, 50% 50%, 100% 50%;
	}
	40% {
		background-position: 0% 100%, 50% 0%, 100% 50%;
	}
	60% {
		background-position: 0% 50%, 50% 100%, 100% 0%;
	}
	80% {
		background-position: 0% 50%, 50% 50%, 100% 100%;
	}
`;
const Loader = styled.div`
	width: 45px;
	aspect-ratio: 0.75;
	--c: no-repeat linear-gradient(#444 0 0);
	background: var(--c) 0% 50%, var(--c) 50% 50%, var(--c) 100% 50%;
	background-size: 20% 50%;
	animation: ${loading} 1s infinite linear;
`;

function FullPageLoading() {
	return (
		<FullPageLoader>
			<Loader />
		</FullPageLoader>
	);
}

export default FullPageLoading;

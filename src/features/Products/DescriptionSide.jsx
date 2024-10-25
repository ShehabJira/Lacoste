import styled from "styled-components";
import { TbIroning2, TbWashDrycleanOff } from "react-icons/tb";
const DescriptionSection = styled.section`
	margin-bottom: 16px;
	padding-bottom: 32px;
	border-bottom: 1px solid #e5e5e5;
	color: #292929;
	font-family: "archivo";
	div:first-of-type {
		padding: 16px 0 8px;
		font-size: 18px;
		font-family: "metropolis";
		line-height: 28px;
	}
	div:nth-of-type(2) {
		font-size: 10px;
		color: #767676;
		padding-bottom: 16px;
		font-weight: 800;
		line-height: 20px;
		letter-spacing: 3px;
		text-transform: uppercase;
	}
	div:nth-of-type(3) {
		font-size: 15px;
		line-height: 25px;
	}
	ul {
		margin: 32px 0 0 6px;
		list-style-type: disc;
		list-style-position: inside;
		line-height: 25px;
	}
`;
const CareSection = styled.section`
	font-family: metropolis, Arial, Helvetica, sans-serif;
	color: #292929;
	h4 {
		padding: 16px 0 8px;
		margin-bottom: 8px;
		font-size: 18px;
		font-weight: 500;
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		li {
			background-color: #f4f4f4;
			width: 48.7%;
			padding: 16px;
			margin-bottom: 8px;
			border-radius: 16px;
			text-align: center;
			img {
				width: 40px;
				height: 40px;
			}
			svg {
				width: 40px;
				height: 40px;
			}
			div {
				margin-top: 16px;
			}
		}
	}
`;
function DescriptionSide() {
	return (
		<div>
			<DescriptionSection>
				<h2>Description and care</h2>
				<div>Description</div>
				<div>PRODUCT REF. L1212-00-XFJ</div>
				<div>
					The Original L.12.12 is the very first polo shirt invented by René
					Lacoste in 1933. With its collar, button placket and Petit Piqué, it
					revolutionised elegant sportswear and freedom of movement. Made using
					20 kilometres of thread knitted under two levels of tension and a
					crocodile logo with 2367 stitches, the Original L.12.12 is a real
					coming together of know-how and expertise.
				</div>
				<ul>
					<li>Petit Pique, the Lacoste signature knit</li>
					<li>Ribbed collar and sleeves</li>
					<li>Classic fit, comfortable cut and sleeves</li>
					<li>Genuine mother of pearl buttons</li>
					<li>Embroidered crocodile sewn on the chest</li>
				</ul>
			</DescriptionSection>
			<CareSection>
				<h4>Care</h4>
				<ul>
					<li>
						<img
							src="https://www.lacoste.com.eg/on/demandware.static/-/Library-Sites-LacosteSharedLibrary/default/dwf7cf928d/care_instructions/donottumbledry.png"
							alt="do not tumble dry"
						/>
						<div>DO NOT TUMBLE DRY</div>
					</li>
					<li>
						<img
							src="https://www.lacoste.com.eg/on/demandware.static/-/Library-Sites-LacosteSharedLibrary/default/dw95f0bbde/care_instructions/donotbleach.png"
							alt="do not bleach"
						/>
						<div>DO NOT BLEACH</div>
					</li>
					<li>
						<img
							src="https://www.lacoste.com.eg/on/demandware.static/-/Library-Sites-LacosteSharedLibrary/default/dwd6faad24/care_instructions/normalprocesstmax30.png"
							alt="normal process t max 30"
						/>
						<div>NORMAL PROCESS T Max 30</div>
					</li>
					<li>
						<img
							src="https://www.lacoste.com.eg/on/demandware.static/-/Library-Sites-LacosteSharedLibrary/default/dwa31f0fd0/care_instructions/linedry.png"
							alt="line dry"
						/>
						<div>LINE DRY</div>
					</li>
					<li>
						<TbWashDrycleanOff />
						<div>Do Not Dry-clean</div>
					</li>
					<li>
						<TbIroning2 />
						<div>Iron Maxsole-platet 150</div>
					</li>
				</ul>
			</CareSection>
		</div>
	);
}

export default DescriptionSide;

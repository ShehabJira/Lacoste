import styled from "styled-components";

const StyledCharacterExpress = styled.div`
	background-color: #f4f4f4;
	margin-top: 30px;
	padding: 20px 0;
	margin-bottom: 20px;
	@media (max-width: 992px) {
		padding: 20px;
	}
	div {
		line-height: 1.5;
		color: #545454;
		margin: auto;
		@media (min-width: 768px) {
			width: 667px;
		}
		text-align: center;
		padding-top: 40px;
		padding-bottom: 30px;
		font-family: Arial, Helvetica, sans-serif;
		p {
			margin-bottom: 16px;
			font-size: 13px;
		}
		p:first-child {
			font-size: 15px;
			color: #292929;
			font-weight: 800;
			margin-bottom: 12px;
		}
	}
`;

function CharacterExpress() {
	return (
		<StyledCharacterExpress>
			<div>
				<p>Lacoste men’s clothing: want to express your character?</p>
				<p>
					If you love fashion and want to look your best it’s time to upgrade
					your wardrobe with Lacoste men’s clothing, and the croc makes a
					difference.
				</p>
				<p>
					The men’s clothing range has come a long way since the original
					Lacoste polo shirt, the signature piece inspired by our founder,
					tennis star René Lacoste. Today you can shop all men’s clothing for
					everything from smart shirts for special nights out to casual track
					trousers to chill in on those much-needed rest days.
				</p>
				<p>
					Quality fabrics in breathable cotton, warm wool, fleece, and technical
					material give every outfit a sporty and quality feel. Whether you want
					to wrap up in a warm zipped jacket or you’re surfing the waves in your
					favourite swim shorts, discover a selection of men’s clothing for
					every season. To make sure you feel good, all of our men's outfits are
					designed for comfort and style. You’ll find plenty of pockets to keep
					your phone safe, drawstrings to keep the wind out, and ribbed cuffs
					for a smart trim… all in a range of colours to suit your mood, so you
					can start your day the right way wearing Lacoste essentials.
				</p>
				<p>
					You’ll also find a wide selection of men's tennis clothing - shorts,
					t-shirts, jackets, and shoes - as a tribute to the gentleman who
					created Lacoste.
				</p>
				<p>
					Inspire confidence – your clothes show off your personality. Wearing
					Lacoste means you're unique.
				</p>
			</div>
		</StyledCharacterExpress>
	);
}

export default CharacterExpress;

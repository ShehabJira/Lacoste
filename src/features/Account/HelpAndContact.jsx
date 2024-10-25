import PageContent from "../../ui/PageContent.jsx";
import styled from "styled-components";
import { BsChevronDown, BsChevronUp, BsLaptop, BsSend } from "react-icons/bs";
import { useState } from "react";
import HeadingRow from "../../ui/HeadingRow.jsx";
import Button from "../../ui/Button.jsx";
import { PiHeadsetThin } from "react-icons/pi";

const HelpContent = styled.div`
	background-color: #fff;
	margin-top: 20px;
	border-radius: 10px;
	padding: 66px 66px 96px;
	@media (max-width: 768px) {
		padding: 30px 15px 76px;
	}
	& > div:first-child {
		font-weight: 600;
		font-size: 18px;
		padding-bottom: 66px;
		line-height: 1.44;
		svg {
			margin-right: 8px;
			margin-bottom: -5px;
			min-width: 22px;
			min-height: 22px;
		}
	}
`;
// Transition Height from 0 to auto using grid.
const Accordion = styled.div``;
const Title = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px 6px;
	align-items: center;
	border-bottom: 1px solid #f4f4f4;
	cursor: pointer;
	span {
		font-size: 15px;
		font-weight: 600;
	}
	svg {
		min-width: 14px;
		min-height: 14px;
		margin: 0 5px;
	}
`;
const Answer = styled.div`
	display: grid;
	grid-template-rows: 0fr;
	transition: grid-template-rows 300ms ease-out;
	& > div {
		background-color: #fff;
		font-size: 15px;
		color: #545454;
		line-height: 1.53;
		font-weight: 100;
		padding: 0 18px;
		overflow: hidden; // This is so important here!
	}
	&.active {
		grid-template-rows: 1fr;
		transition: grid-template-rows 300ms ease-out;
	}
`;
const ContactContent = styled.div`
	background-color: #fff;
	margin: 20px 0 66px;
	border-radius: 10px;
	padding: 66px;
	@media (max-width: 768px) {
		padding: 30px 15px;
		margin: 20px 0 40px;
	}
	div {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 20px;
		svg {
			width: 20px;
			height: 20px;
		}
		span {
			font-size: 18px;
			font-weight: 600;
		}
	}
	p {
		font-size: 15px;
		color: #545454;
		margin-bottom: 16px;
	}
	button {
		padding: 10px 30px 12px;
		height: 40px;
		line-height: 18px;
	}
`;
const CallUsContent = styled.div`
	padding: 66px;
	@media (max-width: 768px) {
		padding: 30px 15px;
	}
	background-color: #fff;
	border-radius: 10px;
	div:first-child {
		display: flex;
		gap: 10px;
		align-items: center;
		line-height: 1.44;
		svg {
			width: 20px;
			height: 20px;
		}
		span {
			font-size: 18px;
			font-weight: 600;
		}
	}
	div:nth-child(2),
	div:nth-child(4) {
		line-height: 1.67;
		color: #545454;
		font-size: 15px;
	}
	div:nth-child(3) {
		margin-top: 16px;
		font-size: 15px;
		font-weight: 600;
		line-height: 1.67;
	}
`;
const helps = [
	{
		title: "How do I monitor the progress of my order?",
		answer: (
			<dd style={{ paddingTop: "18px", marginBottom: "8px" }}>
				If you have placed your order whilst logged in to your account (by creating an account or signing in to your account), you will find your order in my
				account/my orders. If necessary, you can use the link,'track my order' located at the bottom of the page.
				<br />
				<p style={{ marginBottom: "16px" }}>The progress statuses for your order are as follows:</p>
				<ol style={{ paddingLeft: "40px", marginBottom: "16px" }}>
					<li>- confirmed (your order has been confirmed and it will be prepared for processing)</li>
					<li>- cancelled (you order has been cancelled, contact the guest relations team for more information)</li>
					<li>- in preparation (your order has been confirmed and is currently being processed in our warehouse)</li>
					<li>- shipped (your order has been processed and dispatched – you can track its progress on the courier's website using the parcel number)</li>
					<li>- delivered (your order has been delivered to you)</li>
				</ol>
			</dd>
		),
	},
	{
		title: "Are you taking any pre-cautious measures against COVID-19 (Coronavirus)?",
		answer: (
			<dd style={{ paddingTop: "18px", marginBottom: "8px" }}>
				We are operating in line with advice from the world health organization and the local authorities and we are assuring you that we are taking all
				possible pre-cautious measures in our fulfillment centers across the region.
			</dd>
		),
	},
	{
		title: "How do I return a product purchased in the Lacoste Online Shop?",
		answer: (
			<dd style={{ paddingTop: "18px", marginBottom: "8px" }}>
				You have the right to cancel your purchase and return any purchased products (other than customized products) without giving any reason. This right
				lasts until twenty-one (21) days after the day on which you (or a person indicated by you) acquires physical possession of the products. If you order
				multiple products and they are delivered on different days, the period during which you can cancel your purchase without giving any reason will commence
				on the day after you receive the last product. However, please note that this right to refund without a reason does not extend to products customized
				with our polo configurator or monogrammed bags or underwear.
				<br />
				<br />
				if you wish to exchange your products, your exchange will be treated as a return, you will be refunded in accordance with this clause and you should
				place a new order for the replacement products.
				<br />
				<br />
				to exercise your right to cancel, you must inform us of your decision to cancel by contacting our customer care at service.me@lacoste.com or by phone
				+20 224800579 stating that you wish to exercise your right to cancel. You must submit your message before your right to cancel expires.
				<br />
				We will contact you to schedule the pick up of your package.
				<br />
				We invite you to reuse the packaging your order was shipped in to proceed with the return. Please return your articles in mint condition, without them
				being worn or washed. The sole of the shoes has to be clean and intact and the perfume's packaging still sealed. All of the packaging (plastic, boxes),
				accessories (glasses case), user manual have to be returned and product labels must be attached to the items as sold. You can contact our customer care
				service. In your account in the section ‘my orders & returns’ you will see the order number which the customer care agent will need to schedule a pick
				up from your address. You will get a refund as soon as our quality services receive and check your parcel. All items not complying with our return
				policy will be returned to you without refund.
				<br />
				<br />
				All returned products not complying with our return policy will be returned to you without refund. In case you used a promo code on your order, please
				note the value of the promo code is divided up proportionately to the item price. If you return products purchased with a promo code, you will get the
				refund of the amount paid on the returned item minus the promotion amount applied. You will then loose the promotion amount of the returned item
			</dd>
		),
	},
	{
		title: "Can I change or cancel my order once it has been confirmed?",
		answer: (
			<dd style={{ paddingTop: "18px", marginBottom: "8px" }}>
				If you cancel your purchase in accordance with the "right of return" section above, we will reimburse to you all payments received from you, including
				the cost of standard delivery. If, as a result of unnecessary handling by you, the value of the goods is reduced, then we are entitled to make a
				deduction from the reimbursement to take into account any such reduction.
				<br />
				<br />
				Your refund will be processed and paid no later than fourteen (14) days after we receive the returned products from you. We may withhold reimbursement
				until we have received the products back from you, or you have supplied evidence that you have sent the goods back (whichever is the earliest).
				<br />
				<br />
				If you cancel before the goods are delivered, then your refund will be paid no later than fourteen (14) days after the day on which you cancelled your
				order.
				<br />
				<br />
				Your refund will be paid using the same method of payment as was used by you to pay for the order.
			</dd>
		),
	},
	{
		title: "Why buy from the Lacoste Online Shop?",
		answer: (
			<dd style={{ paddingTop: "18px", marginBottom: "8px" }}>
				The Lacoste Online Shop is the official Lacoste shop on the Internet. It offers the same products as those available in stores and also online
				exclusives.
			</dd>
		),
	},
];

function HelpAndContact() {
	const [activeHelp, setActiveHelp] = useState("");

	return (
		<PageContent>
			<HeadingRow>
				<span>Help</span>
			</HeadingRow>
			<HelpContent>
				<div>
					<BsLaptop /> The most consulted questions of the FAQ
				</div>
				{helps.map((help, i) => (
					<Accordion key={i}>
						<Title onClick={() => (i + 1 === activeHelp ? setActiveHelp(0) : setActiveHelp(i + 1))}>
							<span>{help.title}</span>
							{i + 1 === activeHelp ? <BsChevronUp /> : <BsChevronDown />}
						</Title>
						{
							<Answer className={i + 1 === activeHelp ? "active" : ""}>
								<div>{help.answer}</div>
							</Answer>
						}
					</Accordion>
				))}
			</HelpContent>

			<HeadingRow>
				<span>Contact</span>
			</HeadingRow>
			<ContactContent>
				<div>
					<BsSend />
					<span>Send us an email</span>
				</div>
				<p>Contact our Guest Relations Team 7 days a week from 10am to 10pm.</p>
				<Button>Contact Us</Button>
			</ContactContent>

			<CallUsContent>
				<div>
					<PiHeadsetThin />
					<span>Call us</span>
				</div>
				<div>Contact our Guest Relations Team 7 days a week from 10am to 10pm.</div>
				<div>+20 224800579 *</div>
				<div>*local cost according to your operator</div>
			</CallUsContent>
		</PageContent>
	);
}

export default HelpAndContact;

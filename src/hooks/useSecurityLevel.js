import { useEffect, useState } from "react";

function useSecurityLevel(password) {
	const [securityLevel, setSecurityLevel] = useState(0);
	useEffect(
		function handleSecurityLevel() {
			let levels = [];
			if (+password.length >= 6) !levels.includes("one") && levels.push("one");
			if (/[$@$!%*#?&]/g.test(password)) !levels.includes("two") && levels.push("two");
			if (/[A-Z]/g.test(password)) !levels.includes("three") && levels.push("three");
			if (/[a-z]/g.test(password)) !levels.includes("four") && levels.push("four");
			if (/[0-9]/g.test(password)) !levels.includes("five") && levels.push("five");
			setSecurityLevel(+levels.length);
		},
		[password]
	);
	return { securityLevel };
}

export default useSecurityLevel;

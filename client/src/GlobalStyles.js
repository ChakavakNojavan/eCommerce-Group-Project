import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
:root{
  --color-blue-gray: #559EE1;
  --color-charcoal: #233D4D;
  --color-pumpkin: #FE7F2D;
  --color-sunglow: #FCCA46;
  --color-olivine: #A1C181; 
  --font-headers: 'IBM Plex Sans', sans-serif;
  --font-all:'IBM Plex Serif', serif;

}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
p,li,button,span{
  font-family: var(--font-all);
  color: var(--color-charcoal);
}


h1, h2, h3, h4, h5, h6{
  font-family: var(--font-headers);
  color: var(--color-charcoal);
}
`;

import Link from "next/link";

export default function NotFound() {
	return (
		<div style={{
			minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
			flexDirection: 'column', gap: 20, padding: 24, textAlign: 'center'
		}}>
			<h1 style={{fontSize: 72, margin: 0}}>404</h1>
			<p style={{fontSize: 18, margin: 0}}>Page not found.</p>
			<Link href="/" style={{marginTop: 12, color: '#fff', background: '#111827', padding: '8px 16px', borderRadius: 6, textDecoration: 'none'}}>Go back home</Link>
		</div>
	);
}

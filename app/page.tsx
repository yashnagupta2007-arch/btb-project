import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      color: '#333',
      textAlign: 'center'
    }}>
      <header style={{
        padding: '2rem',
        borderBottom: '1px solid #ddd'
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#1a202c',
          margin: 0
        }}>
          Welcome to the BTB ACM Project
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#718096'
        }}>
          Your personalized skill development journey starts here.
        </p>
      </header>

      <main style={{
        flex: 1,
        padding: '2rem',
        maxWidth: '800px'
      }}>
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#2d3748', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>
            What is this project?
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            This project is designed to help you assess your coding skills, identify areas for improvement, and generate a personalized learning roadmap to guide you in your developer journey. Get ready to level up your skills!
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '2rem', color: '#2d3748', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>
            Get Started
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Ready to begin? Take an assessment to discover your current skill level and get a customized roadmap.
          </p>
          <Link href="/assessment" style={{
            backgroundColor: '#4299e1',
            color: 'white',
            padding: '0.8rem 2rem',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}>
            Take Assessment
          </Link>
        </section>
      </main>

      <footer style={{
        padding: '2rem',
        borderTop: '1px solid #ddd',
        width: '100%',
        marginTop: '2rem'
      }}>
        <p style={{ color: '#a0aec0' }}>
          &copy; 2024 BTB ACM Project. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

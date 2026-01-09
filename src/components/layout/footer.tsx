import Link from 'next/link'
import { Container } from './container'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <Container className="py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">A Little Better</h3>
            <p className="text-sm text-gray-400 mb-4">
              An independent software project
            </p>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} A Little Better
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Pages</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/continuous-improvement-framework" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Framework
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm text-gray-400 mb-2">
              <a 
                href="mailto:founder@a-little-better.com" 
                className="hover:text-white transition-colors"
              >
                founder@a-little-better.com
              </a>
            </p>
            <div className="mt-6 space-y-2">
              <a 
                href="https://blogs.a-little-better.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-gray-400 hover:text-white transition-colors"
              >
                Go to blog site
              </a>
              <a 
                href="https://apps.a-little-better.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-gray-400 hover:text-white transition-colors"
              >
                Go to app store
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}


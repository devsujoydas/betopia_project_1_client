import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#4B1E2F] text-white py-10 px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="col-span-3">
            <div className="bg-white w-fit px-4 pt-3 pb-2 rounded-md mb-4">
              <img src="/logo.png" alt="Guehi and Co Logo" />
            </div>
            <p className="text-sm text-zinc-300">
              Empowering financial decisions through transparent credit scoring <br />
              and connecting borrowers with trusted lenders.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm ">
              <li>
                <a href="/" className="hover:underline text-zinc-300 hover:text-white transition-all">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline text-zinc-300 hover:text-white transition-all">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <MapPin size={16} /> 123 Finance Street Douala, Cameroon
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +237 123 456 789
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> info@creditmatch.com
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-8 pt-4 border-t text-zinc-300 border-white/20 flex flex-col md:flex-row justify-between text-sm">
          <p>© 2025 GUEHI AND CO. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

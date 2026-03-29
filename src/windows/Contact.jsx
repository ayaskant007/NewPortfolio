import { WindowControls } from "#components";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="p-8 flex flex-col gap-5 w-full">
        <div>
          <img 
            src="/images/adrian-2.jpg" 
            alt="Profile" 
            className="w-20 h-20 rounded-full object-cover mb-4" 
          />
          <h3>Let's Connect</h3>
          <p className="text-sm text-gray-700 mt-3">
            Got an idea? A bug to squash? Or just wanna talk tech? I'm in.
          </p>
        </div>
        
        <ul className="w-full mt-2">
          {socials.map(({ id, text, icon, bg, link }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a href={link} target="_blank" rel="noreferrer">
                <img 
                  src={icon} 
                  alt={text} 
                  className="w-6 h-6 object-contain brightness-0 invert opacity-90" 
                />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;

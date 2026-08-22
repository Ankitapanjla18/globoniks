import { Link as LinkIcon, UserCircle2 } from "lucide-react";

interface TeamMemberCardProps {
  name: string;
  role: string;
  photoPlaceholder: boolean;
  linkedInUrl: string;
}

export function TeamMemberCard({
  name,
  role,
  photoPlaceholder,
  linkedInUrl,
}: TeamMemberCardProps) {
  return (
    <div className="bg-card border border-border p-6 rounded-2xl text-center group hover:border-indigo-500/30 transition-colors shadow-sm">
      <div className="w-32 h-32 mx-auto rounded-full bg-muted overflow-hidden mb-6 flex items-center justify-center border-4 border-background shadow-md">
        {photoPlaceholder ? (
          <UserCircle2 className="w-16 h-16 text-muted-foreground opacity-50" />
        ) : (
          <div className="w-full h-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-xs">
            Photo
          </div>
        )}
      </div>
      <h3 className="text-xl font-heading font-bold text-foreground mb-1">
        {name}
      </h3>
      <p className="text-sm text-indigo-500 font-medium mb-4">
        {role}
      </p>
      
      {linkedInUrl !== "#" ? (
        <a 
          href={linkedInUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:bg-indigo-500 hover:text-white transition-colors"
        >
          <LinkIcon className="w-5 h-5" />
        </a>
      ) : null}
    </div>
  );
}

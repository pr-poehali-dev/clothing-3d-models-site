import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Model3D from '@/components/3DModel';

interface FeaturedCollectionProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  showModel?: boolean;
}

const FeaturedCollection = ({
  title,
  description,
  imageUrl,
  linkUrl,
  showModel = false
}: FeaturedCollectionProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-muted">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground mb-6">{description}</p>
          <Button 
            className="self-start bg-fashion-primary hover:bg-fashion-primary/90"
            asChild
          >
            <Link to={linkUrl}>
              Посмотреть коллекцию <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="relative aspect-square md:aspect-auto flex items-center justify-center">
          {showModel ? (
            <Model3D alt={title} placeholderImageUrl={imageUrl} />
          ) : (
            <img 
              src={imageUrl} 
              alt={title}
              className="rounded-lg object-cover w-full h-full"
            />
          )}
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default FeaturedCollection;
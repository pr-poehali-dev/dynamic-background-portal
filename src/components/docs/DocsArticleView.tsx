import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { DocSection, getColorClasses } from './DocsData';

type DocsArticleViewProps = {
  article: DocSection['articles'][0];
  section: DocSection;
  onBack: () => void;
};

export const DocsArticleView = ({ article, section, onBack }: DocsArticleViewProps) => {
  const colors = getColorClasses(section.color);

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        onClick={onBack}
        variant="outline"
        className="mb-6 border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
      >
        <Icon name="ArrowLeft" size={18} className="mr-2" />
        Назад к разделам
      </Button>
      
      <Card className={`bg-card/50 backdrop-blur-sm border ${colors.border} animate-fade-in`}>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 ${colors.bg} rounded-lg flex items-center justify-center ${colors.glow}`}>
              <Icon name={section.icon as any} size={32} className={colors.text} />
            </div>
            <div className="flex-1">
              <Badge className={`${colors.bg} ${colors.text} border ${colors.border} mb-2`}>
                {section.title}
              </Badge>
              <CardTitle className={`text-3xl font-orbitron ${colors.text}`}>
                {article.title}
              </CardTitle>
              <p className="text-foreground/60 mt-2">{article.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-foreground/80 leading-relaxed space-y-4">
              {article.content.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} className={`text-3xl font-orbitron font-bold ${colors.text} mt-8 mb-4`}>{line.replace('# ', '')}</h1>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-orbitron font-bold text-foreground mt-6 mb-3">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('- ')) {
                  return (
                    <div key={index} className="flex items-start gap-3 ml-4">
                      <Icon name="Check" size={18} className={`${colors.text} mt-1 flex-shrink-0`} />
                      <span>{line.replace('- ', '')}</span>
                    </div>
                  );
                }
                if (line.match(/^\d+\. /)) {
                  return (
                    <div key={index} className="flex items-start gap-3 ml-4">
                      <span className={`${colors.text} font-bold flex-shrink-0`}>
                        {line.match(/^\d+/)?.[0]}.
                      </span>
                      <span>{line.replace(/^\d+\. /, '')}</span>
                    </div>
                  );
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={index} className="font-bold text-foreground mt-4">{line.replace(/\*\*/g, '')}</p>;
                }
                if (line.trim()) {
                  return <p key={index} className="text-foreground/80">{line}</p>;
                }
                return <div key={index} className="h-2" />;
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

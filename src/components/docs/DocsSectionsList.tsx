import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { DocSection, getColorClasses } from './DocsData';

type DocsSectionsListProps = {
  sections: DocSection[];
  onArticleClick: (articleId: string) => void;
};

export const DocsSectionsList = ({ sections, onArticleClick }: DocsSectionsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {sections.map((section, sectionIndex) => {
        const colors = getColorClasses(section.color);
        return (
          <div key={section.id} className="space-y-4 animate-fade-in" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center ${colors.glow}`}>
                <Icon name={section.icon as any} size={24} className={colors.text} />
              </div>
              <h2 className={`text-2xl font-orbitron font-bold ${colors.text}`}>{section.title}</h2>
            </div>
            
            <div className="space-y-3">
              {section.articles.map((article) => (
                <Card
                  key={article.id}
                  onClick={() => onArticleClick(article.id)}
                  className={`bg-card/50 backdrop-blur-sm border ${colors.border} hover:scale-105 transition-all cursor-pointer group`}
                >
                  <CardHeader>
                    <CardTitle className={`text-lg font-orbitron ${colors.text} group-hover:underline flex items-center justify-between`}>
                      {article.title}
                      <Icon name="ChevronRight" size={20} className={colors.text} />
                    </CardTitle>
                    <p className="text-sm text-foreground/60">{article.description}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

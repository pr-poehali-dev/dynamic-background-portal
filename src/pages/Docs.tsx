import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { docsSections } from '@/components/docs/DocsData';
import { DocsSectionsList } from '@/components/docs/DocsSectionsList';
import { DocsArticleView } from '@/components/docs/DocsArticleView';

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const filteredSections = docsSections.map(section => ({
    ...section,
    articles: section.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.articles.length > 0);

  const getSelectedArticleDetails = () => {
    for (const section of docsSections) {
      const article = section.articles.find(a => a.id === selectedArticle);
      if (article) return { article, section };
    }
    return null;
  };

  const selectedDetails = getSelectedArticleDetails();

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-4">
            <span className="text-neon-cyan">База</span>
            <span className="text-neon-purple"> знаний</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
            Полная документация по работе с платформой
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск в документации..."
              className="pl-12 h-14 text-lg bg-card/50 border-neon-cyan/30 focus:border-neon-cyan"
            />
          </div>
        </div>

        {selectedArticle && selectedDetails ? (
          <DocsArticleView
            article={selectedDetails.article}
            section={selectedDetails.section}
            onBack={() => setSelectedArticle(null)}
          />
        ) : (
          <DocsSectionsList
            sections={filteredSections}
            onArticleClick={setSelectedArticle}
          />
        )}

        {filteredSections.length === 0 && searchQuery && (
          <div className="text-center py-20">
            <Icon name="Search" size={64} className="text-foreground/20 mx-auto mb-4" />
            <h3 className="text-2xl font-orbitron text-foreground/60 mb-2">Ничего не найдено</h3>
            <p className="text-foreground/40">Попробуйте изменить поисковый запрос</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Docs;

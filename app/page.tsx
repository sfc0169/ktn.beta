'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, Send, Star } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const logoRef = useRef(null)
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  useEffect(() => {
    const logo = logoRef.current
    if (logo) {
      const ctx = logo.getContext('2d')
      ctx.font = 'bold 72px Brush Script MT, cursive'
      ctx.fillStyle = '#000'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      let progress = 0
      const text = 'KTN'
      const animateLogo = () => {
        ctx.clearRect(0, 0, logo.width, logo.height)
        for (let i = 0; i < text.length; i++) {
          ctx.globalAlpha = Math.max(0, Math.min(1, progress - i * 0.5))
          ctx.fillText(text[i], logo.width / 2 + (i - 1) * 40, logo.height / 2)
        }
        progress += 0.02
        if (progress < text.length + 1) {
          requestAnimationFrame(animateLogo)
        }
      }
      animateLogo()
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.canvas
            ref={logoRef}
            width={200}
            height={100}
            style={{ opacity, scale }}
          />
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <ul className="hidden md:flex space-x-6">
            {['ホーム', 'アプローチ', 'プロジェクト', 'ブログ', 'コンタクト'].map((item) => (
              <li key={item}>
                <button onClick={() => scrollToSection(item)} className="text-gray-600 hover:text-blue-600 transition-colors">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50 md:hidden"
          >
            <div className="p-4">
              <button onClick={() => setIsMenuOpen(false)} className="mb-4" aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
              <ul className="space-y-4">
                {['ホーム', 'アプローチ', 'プロジェクト', 'ブログ', 'コンタクト'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item)}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="ホーム" className="h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.div
              animate={{
                scale: [1, 1.2, 1.1, 1],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
              }}
              className="w-full h-full bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 opacity-30"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center z-10"
          >
            <h1 className="text-6xl font-bold mb-4 text-gray-800">Kick Tobacco Now!!</h1>
            <p className="text-xl mb-4 text-gray-600">あなたの禁煙をサポートします</p>
            <p className="text-2xl font-semibold mb-8 text-blue-600">禁煙に遅すぎることはありません</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => scrollToSection('アプローチ')}
            >
              禁煙を始める
            </motion.button>
          </motion.div>
        </section>

        <section id="reasons-to-quit" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">まだ間に合います！</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl mb-6">
                ある研究によると、35歳までに禁煙すると、タバコを吸ったことがない人と同じレベルまで死亡リスクを下げることができます。
              </p>
              <p className="text-lg mb-6">
                <span className="text-lg">しかし、</span>
                <span className="text-2xl font-bold text-blue-600">禁煙に遅いなんてことはありません！</span>
                <span className="block mt-2">たとえ35歳を過ぎていても、禁煙には大きな価値があります。年齢に関係なく、禁煙は常に健康に良い影響をもたらし、どんな年齢からでも始める意義があるのです。</span>
              </p>
              <div className="text-center">
                <a
                  href="https://gigazine.net/news/20221026-quitting-smoking-mortality-risk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  詳細を読む
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="アプローチ" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">私たちのアプローチ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: '個別カウンセリング',
                  description: '経験豊富なカウンセラーによる一対一のサポートで、あなたの禁煙をサポートします。',
                  icon: '🗣️',
                },
                {
                  title: 'グループセッション',
                  description: '同じ目標を持つ仲間と一緒に禁煙に取り組むことで、モチベーションを高めます。',
                  icon: '👥',
                },
                {
                  title: 'デジタルツール',
                  description: 'スマートフォンアプリを使用して、24時間365日のサポートを提供します。',
                  icon: '📱',
                },
              ].map((approach, index) => (
                <motion.div
                  key={approach.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{approach.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">{approach.title}</h3>
                  <p className="text-gray-600">{approach.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="プロジェクト" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">禁煙プロジェクト</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: '職場の禁煙プログラム', image: '/placeholder.svg?height=300&width=400', description: '企業と協力して従業員の健康増進を図る禁煙支援プログラム' },
                { title: '若者向け禁煙キャンペーン', image: '/placeholder.svg?height=300&width=400', description: 'SNSを活用した若年層向けの禁煙啓発活動' },
                { title: '禁煙アプリの開発', image: '/placeholder.svg?height=300&width=400', description: 'AIを活用した個別化された禁煙サポートアプリの開発と運用' },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="ブログ" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">最新のブログ記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: '禁煙の健康効果：1週間で現れる変化', date: '2024-10-15', excerpt: '禁煙を始めてから1週間で体に現れる驚くべき変化について解説します。' },
                { title: 'ニコチン依存症を克服する方法', date: '2024-10-10', excerpt: 'ニコチン依存症のメカニズムと、それを克服するための効果的な方法を紹介します。' },
                { title: '禁煙後の体重増加を防ぐコツ', date: '2024-10-05', excerpt: '禁煙後によくある体重増加を防ぐための食事と運動のアドバイスをお届けします。' },
              ].map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h3>
                    <p className="text-gray-600">{post.date}</p>
                    <p className="text-gray-700 mb-4">{post.excerpt}</p>
                    <Link href="#" className="text-blue-600 hover:underline">
                      続きを読む
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">成功事例</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                '1ヶ月禁煙達成', '3ヶ月禁煙継続', 
                '半年禁煙達成', '1年禁煙継続',
                '禁煙後の健康改善', 'ストレス軽減',
                '経済的節約', '家族関係改善'
              ].map((success, index) => (
                <motion.div
                  key={success}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white p-4 rounded-lg shadow-md text-center"
                >
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                  <p className="text-gray-800">{success}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">関連記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: '電子タバコに切り替えると禁煙成功率が8倍に跳ね上がる',
                  url: 'https://gigazine.net/news/20211229-cigarette-vape-smoking',
                },
                {
                  title: '禁煙には「金銭的な報酬を与えること」が最も効果的',
                  url: 'https://gigazine.net/news/20180527-quit-smoking-trial',
                },
                {
                  title: 'たばこを吸うのをやめたとき体に何が起きるのか',
                  url: 'https://gigazine.net/news/20170203-what-happens-when-you-stop-smoking',
                },
                {
                  title: '国内の喫煙率が過去最低の16.7％となり記録を更新',
                  url: 'https://gigazine.net/news/20201028-smoking-rates',
                },
                {
                  title: '喫煙者は非喫煙者よりも「孤独な老後」を過ごす可能性が高い',
                  url: 'https://gigazine.net/news/20220205-smoking-increases-isolation-loneliness',
                },
                {
                  title: '喫煙者の子どもはテストの成績が低く問題行動が多い',
                  url: 'https://gigazine.net/news/20220128-smoke-parent-children',
                },
              ].map((article, index) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">{article.title}</h3>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      続きを読む
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">今日から始める、新しい人生</h2>
            <p className="text-xl mb-8">禁煙の第一歩を踏み出しましょう。私たちがサポートします。</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
              onClick={() => scrollToSection('コンタクト')}
            >
              無料相談を予約する
            </motion.button>
          </div>
        </section>
      </main>

      <footer id="コンタクト" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">お問い合わせ</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1">お名前</label>
                  <input type="text" id="name" className="w-full px-3 py-2 text-gray-800 rounded" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1">メールアドレス</label>
                  <input type="email" id="email" className="w-full px-3 py-2 text-gray-800 rounded" required />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1">メッセージ</label>
                  <textarea id="message" rows={4} className="w-full px-3 py-2 text-gray-800 rounded" required></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  送信
                </motion.button>
              </form>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Kick Tobacco Now!!</h3>
              <p className="mb-4">あなたの禁煙をサポートする団体</p>
              <p className="mb-2">所在地: 東京都新宿区</p>
              <p className="mb-2">電話: 0120-123-456</p>
              <p className="mb-4">メール: info@kicktobacconow.jp</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-blue-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-blue-400 transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-blue-400 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 Kick Tobacco Now!!. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <motion.div
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Send className="transform rotate-45" />
      </motion.div>
    </div>
  )
}

# ![my_first_lamp](https://github.com/mokmokjp/my_first_lamp/blob/master/docs/logo.png "my_first_lamp")

## 概要

Web制作・開発環境を作るためのボイラープレート
- 仮想マシンはLAMP環境で、必要に応じてWordPress等のCMSを入れます
- 仮想マシンはVirtualBox + Vagrant で構築し、Ansibleでプロビジョニングします
- ホストマシン上にはnode.jsを入れ、GulpでのSASS・PostCSS・Babel環境を作ります
- プロジェクトはGitでバージョン管理します
- GitHubとSlackを連携させます

![system_view](https://raw.githubusercontent.com/mokmokjp/my_first_lamp/master/docs/system_view.png "system_view")

===仮想マシン

| 分類 | 内容 |
|--|--|
|OS(VagrantBox)|[bento/centos-6.7 Vagrant box](https://app.vagrantup.com/bento/boxes/centos-6.7) v2.2.7|
|Webサーバー|[Apache](http://httpd.apache.org/docs/2.2/ja/) v2.2.15-60|
|DBサーバー|[MySQL](https://dev.mysql.com/doc/refman/5.6/ja/) v5.6|
|言語|[php](http://php.net/manual/ja/) v5.6.32|
|バージョン管理|[Git](https://git-scm.com/book/ja/v2) v2.14.1|
|仮想化ソフト|[VirtualBox](https://www.virtualbox.org/wiki/Documentation) v5.1.28|
|仮想マシン構築|[Vagrant](https://www.vagrantup.com/docs/index.html) v2.0.0|
|インフラ構成管理|[ansible_local](https://www.vagrantup.com/docs/provisioning/ansible_local.html), [Ansible](http://docs.ansible.com/ansible/latest/index.html) 最新版|
|CIツール|[Jenkins](https://jenkins.io) v1.644|
|メモリ|2GB|
|ホスト名|my_first_lamp|
|IPアドレス|`自分で設定`|
|SSH|ユーザ名: Vagrant, パスワード: Vagrant|
|SSH|ユーザ名: root, パスワード: Vagrant|
|DBユーザ|ユーザ名: root, パスワード: `自分で設定`|
|DBユーザ|ユーザ名: `自分で設定`, パスワード: `自分で設定`|
|DB名|`自分で設定`|

===本番サーバー

| 分類 | 内容 |
|--|--|
|IPアドレス|`サーバー会社から告知される`|
|SSH|ユーザ名: root, パスワード: `サーバー会社から告知される`|
|SSH|ユーザ名: `自分で設定`, パスワード: `自分で設定`|
|DBユーザ|ユーザ名: root, パスワード: `自分で設定`|
|DBユーザ|ユーザ名: `自分で設定`, パスワード: `自分で設定`|

===ホストマシン

| 分類 | 内容 |
|--|--|
|OS|Windows10|
|[node.js](https://nodejs.org/ja/docs/)|v8.9.1|
|[npm](https://docs.npmjs.com)|v5.5.1|
|バージョン管理|[Git](https://git-scm.com/book/ja/v2) v2.14.1|
|その他ソフト|[Cygwin](https://cygwin.com/cygwin-ug-net.html) (ssh, rsync)|

node_modules(npmでプロジェクトルートにローカルインストール)

| 分類 | 内容 |
|--|--|
|[autoprefixer](https://www.npmjs.com/package/autoprefixer)|v7.1.5|
|[babel-core](https://www.npmjs.com/package/babel-core)|v6.26.0|
|[babel-preset-env](https://www.npmjs.com/package/babel-preset-env)|v1.6.1|
|[gulp](https://github.com/gulpjs/gulp/blob/master/docs/API.md)|v3.9.1|
|[gulp-babel](https://www.npmjs.com/package/gulp-babel)|v7.0.0|
|[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)|v3.9.0|
|[gulp-concat](https://www.npmjs.com/package/gulp-concat)|v2.6.1|
|[gulp-eslint](https://www.npmjs.com/package/gulp-eslint)|v4.0.0|
|[gulp-postcss](https://www.npmjs.com/package/gulp-postcss)|v7.0.0|
|[gulp-sass](https://www.npmjs.com/package/gulp-sass)|v3.1.0|
|[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)|v2.6.1|
|[gulp-uglify](https://www.npmjs.com/package/gulp-uglify)|v3.0.0|
|[postcss-reporter](https://www.npmjs.com/package/postcss-reporter)|v5.0.0|
|[postcss-sass](https://www.npmjs.com/package/postcss-sass)|v0.2.0|
|[stylelint](https://www.npmjs.com/package/stylelint)|v8.2.0|

gulpのビルド設定(全てgulpfile.jsに記述)
| 分類 | 内容 |
|--|--|
|autoprefixer|[サポートするブラウザ](http://browserl.ist/?q=last+1+Chrome+versions%2C+last+1+Firefox+versions%2C+last+1+Explorer+versions%2C+last+1+Edge+versions%2C+last+1+Safari+versions%2C+last+1+ios_saf+versions%2C+last+1+and_chr+versions%2C+last+1+Android+versions)|
|stylelint|略|
|babel|[サポートするブラウザ](http://browserl.ist/?q=last+1+Chrome+versions%2C+last+1+Firefox+versions%2C+last+1+Explorer+versions%2C+last+1+Edge+versions%2C+last+1+Safari+versions%2C+last+1+ios_saf+versions%2C+last+1+and_chr+versions%2C+last+1+Android+versions), ES2017使用|
|eslint|ES2017使用|

| ブラウザ | バージョン |
|--|--|
|Chrome|last 1 version|
|Firefox|last 1 version|
|Internet Explorer|last 1 version|
|Edge|last 1 version|
|Safari|last 1 version|
|iOS Safari|last 1 version|
|Android Chrome|last 1 version|
|Android|last 1 version|


## 使い方

### 【1】ホストマシンにGitのインストール

1. ホストマシンに[Git(v2.14.1)](https://git-scm.com/downloads)をインストール。(参考: [Gitのインストール](docs/install_git.md))
2. ユーザー名とメールアドレスを、Gitにグローバル設定する
```sh
$ git config --global user.name "任意のユーザ名"
$ git config --global user.email "任意のメールアドレス"
```
3. UTF-8環境で、`ؚ$ git commit`や`$ git status`するとき、ؚ日本語ファイル名が数値エスケープされるのを回避するよう、Gitにグローバル設定する
```sh
$ git config --global core.quotepath false
```
4. 改行コードを自動変換しないように、Gitにグローバル設定する
```sh
$ git config --global core.autocrlf false
```

### 【2】仮想マシンを作るための準備

1. ホストマシンに[VirtualBox(v5.1.28)](https://www.virtualbox.org/wiki/Downloads)をインストール
2. ホストマシンに[Vagrant(v2.0.0)](https://www.vagrantup.com/downloads.html)をインストール
3. ホストマシンがWindowsの場合、[Cygwin](https://cygwin.com/install.html)のsshとrsyncをインストールし、CygwinにPATHを通す
4. PCの仮想化支援機能を有効にしておく。PCのメーカーごとによって操作や設定が違うので、各々調べて行ってください。
5. ホストマシンにプロジェクト用のディレクトリを作り、このリポジトリをgit cloneする
6. ホストマシンを再起動

### 【3】仮想マシンの設定

仮想マシンのVirtualBoxでの名前、仮想マシンのホスト名を設定する
次のファイルを編集 `Vagrantfile`:
```text
v.name = "`自分で設定`"
```
```text
config.vm.hostname = "`自分で設定`"
```
```text
  config.vm.network "private_network", ip: "`自分で設定`"
```

### 【4】SSHユーザー、DBユーザー、DBネーム、Jenkinsユーザの設定

次のファイルを編集 `./ansiblefiles/group_vars/all.yml`:
```yml
linux_newusers        :
  `自分で設定`         :
    detail            : 操作用ユーザ
    groups            : users
    pass              : "{{ '`自分で設定`' |password_hash('sha256') }}"
    shell             : /bin/bash
    priv              : member
...
mysql_user_home: /root
mysql_user_name: root
mysql_user_password: `↓のmysql_root_passwordと同じ値を自分で設定`
...
mysql_root_home: /root
mysql_root_username: root
mysql_root_password: `自分で設定`
...
mysql_databases:
   - name: `自分で設定`
     collation: utf8_general_ci
     encoding: utf8
     replicate: 1
...
mysql_users:
   - name: `自分で設定`
     host: localhost
     password: `自分で設定`
     priv: "*.*:USAGE"
```
```
jenkins_admin_username: `自分で設定`
jenkins_admin_password: `自分で設定`
```

### 【5】仮想マシンの起動、プロビジョニング、終了など

| 目的 | コマンド |
|--|--|
|仮想マシンの起動|ホストマシンのプロジェクトルート(このリポジトリをクローンしたディレクトリ)に移動し、`$ vagrant up`コマンドを打つ。必要なVagrantBoxがホストマシンにインストールされ、仮想マシンが起動し、仮想マシン上のAnsibleがプロビジョニングを行う。初回時にはVagrantBoxのインストールと、プロビジョニングが行われるので時間がかかる。|
|仮想マシンの終了|ホストマシンのプロジェクトルートで、`$ vagrant halt`コマンドを打つ|
|仮想マシンの破棄|ホストマシンのプロジェクトルートで、`$ vagrant destroy`コマンドを打つ|
|仮想マシンのプロビジョニングを行う|ホストマシンのプロジェクトルートで、`$ vagrant provision`コマンドを打つ|
|ホストマシンのプロジェクトディレクトリ内のファイル変更を検知し、仮想マシン上の特定のディレクトリに一方向で同期させる|プロジェクトルートで、`$ vagrant rsync-auto`コマンドを打つ。なお、仮想マシンからホストマシンへのファイル同期はできない。|

### 【6】ホストマシンのフロントエンド開発環境を整える

1. ホストマシンに[node.js(v8.9.1)](https://nodejs.org/ja/download/releases/)をインストール。パッケージマネージャのnpmも一緒にインストールされる。node.jsにPATHが自動で通される。
2. ホストマシンを再起動
3. package.jsonファイルの内容に基づき、npmで必要なものをプロジェクトルートにローカルインストール。ホストマシンのプロジェクトルートで、以下コマンドを実行。
```sh
$ npm install
```

### 【7】gulpの設定、実行

`gulpfile.js`を編集することで、gulpの動作設定ができます。

| 目的 | コマンド |
|--|--|
|デフォルトのタスクを実行|ホストマシンのプロジェクトルートで、`$ npm run gulp`コマンドを打つ|
|特定のtasknameを実行|ホストマシンのプロジェクトルートで、`$ npm run gulp taskname`コマンドを打つ|
|デフォルトのタスクを実行し、ファイル監視|ホストマシンのプロジェクトルートで、`$ npm run gulp watch`コマンドを打つ|
|監視系のタスクを終了|ホストマシンのプロジェクトルートで、`Ctrl + C`|

### 【8】開発

html/内のファイルを変更すると
- gulpのタスクが自動実行される
- rsync-autoで、ホストマシンのhtml/が、仮想マシンのvar/www/html/にアップロードされる

ブラウザで確認
- ホストマシンのブラウザで、「`【3】で自分で設定したIPアドレス`」「`ホストマシンのローカルIPアドレス:8080`」「`localhost:8080`」にアクセスすると、html/index.htmlが表示される
- LAN内のモバイル端末などで、「`ホストマシンのローカルIPアドレス:8080`」にアクセスすると同じく表示される

WinSCPで仮想マシンに接続する場合
- 転送プロトコル: SFTP
- ホスト名: 「`【3】で自分で設定したIPアドレス`」
- ユーザ名: vagrant
- パスワード: vagrant
- 設定>SSH>認証>秘密鍵: .vagrant/machines/default/virtualbox/private_keyを選択するとppk形式に変換されるので、それを指定する

### 【*】仮想マシン上のAdminerにアクセス

1. 「`【3】で自分で設定したIPアドレス/adminer/`」でアクセスできる

### 【*】仮想マシン上のJenkinsにアクセス

1. 仮想マシン上のJenkinsには「`【3】で自分で設定したIPアドレス:8080`」でアクセスできる

### 【*】DBのエクスポート、インポートを行う

1. Adminerにログインし、エクスポート
2. Adminerにログインし、1をインポート

### 【*】本番サーバーのプロビジョニング(Ansibleで)

1. 本番サーバーをレンタルして、IPアドレスとSSHのrootパスワードを入手する。
2. 本番サーバーの管理パネルからCentOs6をインストール
3. `/ansiblefiles/inventories/remote_production.ini` を編集
```ini
[webservers]
`1のIPアドレスを入力`

[dbservers]
`1のIPアドレスを入力`
```
4. ホストマシンで、`$ vagrant up`で仮想マシンを立ち上げ、`$ vagrant ssh`で仮想マシンにssh接続する
5. 仮想マシンで以下コマンドを実行し、パスワードを求められるので1のものを入力
```sh
$ ansible-playbook -i /vagrant/ansiblefiles/inventories/remote_production.ini /vagrant/ansiblefiles/site.yml --user=root --ask-pass -c paramiko
```

### 【*】本番サーバーのデプロイ(Jenkinsで)

1. 本番サーバーにSSH接続して、公開鍵を作成
鍵の生成。パスフレーズは空でする
`
$ sudo usermod -d /var/lib/jenkins -s /bin/bash jenkins
$ cd /var/lib/jenkins
$ sudo -u jenkins ssh-keygen
`
登録した鍵を通す
`
$ vi ~/.ssh/config
Host bitbucket.org
  Hostname bitbucket.org
  User git
  IdentityFile /var/lib/jenkins/.ssh/id_rsa
`

2. Bitbucketに公開鍵を登録
/var/lib/jenkins/.ssh/id_rsa.pub の内容をコピペ

3. 本番サーバーのJenkinsにプラグインを追加
Git Plugin
Git Parameter Plugin

4-1. 本番サーバーのJenkinsにジョブを追加
ビルドのパラメータ化 - Git Parameter - Name: ${myparam}
ビルドのパラメータ化 - Git Parameter - ParameterType: Branch
プロジェクトの高度なオプション>カスタムワークスペースを使用: /var/www/
ソースコード管理: git
Repository URL: git@bitbucket.org:bitbucketのユーザ名/リポジトリ名.git
認証情報-種類: SSHユーザー名と秘密鍵
認証情報-スコープ: グローバル
認証情報-ユーザー名: jenkins
認証情報-秘密鍵: jenkinsのマスター上の~/.sshから
認証情報-パスフレーズ: 
Branches to build: ${myparam}
リポジトリブラウザ欄: bitbucketweb
URL: https://bitbucketのユーザ名@bitbucket.org/リポジトリ名.git
SCMをポーリング: チェックオフ

4-2. 本番サーバーの不要ディレクトリ削除
これをしないとJenkinsがgit cloneできない
/var/www/cgi-bin
/var/www/error
/var/www/icons

4-3. サーバーの/var/wwwのパーミッションを0757に変更
これをしないとJenkinsがgit cloneできない

5. 本番サーバーのJenkinsにジョブを追加
プロジェクトの高度なオプション>カスタムワークスペースを使用: /var/www/
ビルド>シェルの実行: npm run gulp

6. 4と5をパイプラインでつなげる

### 【*】GitHubにgit pushしたら、Slackに通知する

1. Slackのアカウントを作成する
2. [https://my.slack.com/apps](https://my.slack.com/apps)にアクセスし、SlackにGitHubのインテグレーションを追加する。通知先のチャンネルを選択し、GitHubアカウントを選択する
3. GitHubのリポジトリとブランチを選択、Slackに通知したいイベントを選択する
4. 以上の設定で、GitHub上でイベントが発生時にSlackへ通知が飛ぶようになる

### 【*】.editorconfigファイルの設定をテキストエディタに適用する

- [Atomの場合](https://atom.io/packages/editorconfig)
- [Bracketsの場合](https://github.com/kidwm/brackets-editorconfig)
- [Emacsの場合](https://github.com/editorconfig/editorconfig-emacs)
- [PhpStormの場合](https://plugins.jetbrains.com/plugin/7294-editorconfig)
- [SublimeText3の場合](https://github.com/sindresorhus/editorconfig-sublime)
- [Vimの場合](https://github.com/editorconfig/editorconfig-vim)
- [VisualStudioの場合](https://docs.microsoft.com/ja-jp/visualstudio/ide/create-portable-custom-editor-options)

### 【*】EC-CUBE2.X系のインストール

1. ./data/ディレクトリと、./html/ディレクトリがある場合は削除してから、ホストマシンでbat/download_eccube.bat を実行する
2. `ansiblefiles/site.yml`の`eccube`をコメントインさせる
3. ホストマシンで`$ git commit`しておく
4. ホストマシンで、`$ vagrant up`で仮想マシンを立ち上げ、`$ vagrant provision`でプロビジョニングをしておく
5. ホストマシンで、`$ vagrant rsync-auto`で仮想マシンにソースコードをアップロード
6. ブラウザで「【3】で自分で設定したIPアドレス/install/」にアクセス
7. 画面の指示に従ってインストールを行う


## このファイル・ディレクトリ何？

| ファイル・ディレクトリ | 内容 |
|--|--|
|.git/|Gitの情報を格納しているディレクトリ|
|.vagrant/|Vagrantが自動生成するディレクトリ|
|ansiblefiles/|AnsiblePlaybookを格納しているディレクトリ|
|docs/|my_first_lampのドキュメントを格納してるディレクトリ|
|html/|/var/www/html/(Webサーバーのルートディレクトリ)、にアップロードするディレクトリ|
|node_modules/|npmで、package.jsonをもとにローカルインストールしたnode.jsのpackageを格納しているディレクトリ|
|.editorconfig|テキストエディタの設定|
|.gitignore|Gitでバージョン管理から除外するファイル・ディレクトリ、を記述するファイル|
|gulpfile.js|Gulpの動作を記述するファイル。autoprefixer, stylelint, babel, eslintの設定もこのファイルに記述しています。|
|composer.json|composerのpackageを管理するためのファイル|
|composer.lock|composerのpackageを管理するためのファイル|
|package-lock.json|node.jsのpackageを管理するためのファイル|
|package.json|node.jsのpackageを管理するためのファイル|
|Vagrantfile|VagrantとVirtualBoxの設定を記述するファイル|

## トラブルシューティング

`$vagrant up`できない
- PCの仮想化支援機能を有効にする。
- ディレクトリ・ファイル名に日本語が含まれていたら、英数に治す
- 他のプロジェクトの仮想マシンを起動中の場合は、`$vagrant halt`で一度終了させておく

`$ vagrant rsync-auto`が動作しない
- Windowsではrsyncがデフォルトで使えないので、[Cygwin](https://cygwin.com/cygwin-ug-net.html)でrsyncをインストールしておく。
- ファイル名に日本語を使用しない

## その他

### 本リポジトリを、チーム開発に適用するメリット

GitでのVersion Control
- 可視: 開発の履歴が可視化される
- 共有: リソースをチームで共有できる
- コードレビューをワークフローに組み込める

VagrantとAnsibleを使用したInfrastructure as Code
- 省力: 手動でインフラの設定をする必要はなく、`$vagrant up`コマンドを打つだけで自動でインフラ設定ができる
- 平易: 高度なサーバーの知識より学習コストが低い、ドメイン固有言語を使用するため、属人化しにくい
- 抽象: 開発環境・本番環境などの、異なる環境間の差異を吸収してくれる。
- 冪等: 何度実行しても同じ結果が得られる
- 可視: インフラ設定をコードで管理することで、可視化できる
- 共有: バージョン管理に含めることができ、共有が可能になる
- ローカル開発環境を作ることで、ほかの開発者へ影響を与えずに開発ができる
- メンテナンス性: コードへの変更がインフラの変更になるため、メンテナンス性が高い

Jenkinsを使用したContinuous Integration
- 省力: 手動でのビルド・デプロイを自動化できる
- 平易: 複雑なビルド・デプロイ手順も自動化することで、スキルのない人でも実行できる
- 可視: ビルド・デプロイを履歴として残せる
- 冪等: 何度実行しても同じ結果が得られる

SlackでのChatOPS
- 省力: 開発の一連のやりとりをチャットツールに統合できる
- 可視: 会話のログが蓄積される
- 共有: コードに変更が加えられた際に、チャットツールで共有ができる

フロントエンド開発環境
- 省力: ビルドをgulpで自動化できる
- 共有: package.jsonやgulp.jsをバージョン管理することで、同じ環境をチームで共有できる
- SASSでCSSを効率よく記述
- PostCSSで自動でベンダープレフィックスを付与
- BabelでES6のコードをES5にコンパイル

### 参考書籍
- [実践 Vagrant](https://www.amazon.co.jp/実践-Vagrant-Mitchell-Hashimoto/dp/4873116651)
- [Ansible 実践ガイド](https://www.amazon.co.jp/Ansible実践ガイド-impress-top-gear-北山/dp/4295000469)
- [Jenkins実践入門](https://www.amazon.co.jp/改訂新版Jenkins実践入門-――ビルド・テスト・デプロイを自動化する技術-WEB-PRESS-plus/dp/4774174238/ref=cm_cr_srp_d_product_top?ie=UTF8)
- [Gitが、おもしろいほどわかる基本の使い方33](https://www.amazon.co.jp/Gitが、おもしろいほどわかる基本の使い方33-大串-肇-ebook/dp/B00Y2FKN9C)
- [エンジニアのためのGITの教科書](https://www.amazon.co.jp/エンジニアのためのGITの教科書-WEB-Engineer’s-Books-株式会社リクルートテクノロジーズ/dp/4798143669)
- [DevOps導入指南](https://www.amazon.co.jp/DevOps導入指南-Infrastructure-Codeでチーム開発・サービス運用を効率化する-Engineer’s-Books/dp/4798147605)
- [Web制作の最新常識](https://www.amazon.co.jp/現場のプロが教えるWeb制作の最新常識-アップデート版-知らないと困るWebの新ルール-久保-知己/dp/484436586X)

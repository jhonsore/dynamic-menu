<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Dynamic menu</title>

<script type="text/javascript" src="jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="msCoreCustomMenu.js"></script>

<style type="text/css" media="screen">
.clear{clear:both !important; float:none !important; margin:0px !important; padding:0px !important; height:0px !important; width:0px !important}
.clearfix:after {content: "."; display: block; clear: both; visibility: hidden; line-height: 0; height: 0;}
.clearfix {display: inline-block;}
html[xmlns] .clearfix {display: block;}
* html .clearfix {height: 1%;}

/*reset css*/
/*
    Tripoli is a generic CSS standard for HTML rendering. 
    Copyright (C) 2007  David Hellsing

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
* { margin: 0; padding: 0; text-decoration: none; font-size: 1em; outline: none; }
code, kbd, samp, pre, tt, var, textarea, input, select, isindex, listing, xmp, plaintext { font: inherit; font-size: 1em;}
dfn, i, cite, var, address, em { font-style: normal; }
th, b, strong, h1, h2, h3, h4, h5, h6 { font-weight: normal; }
a, img, a img, iframe, form, fieldset, abbr, acronym, object, applet, table { border: none; }
table { border-collapse: collapse; border-spacing: 0; }
caption, th, td, center { text-align: left; vertical-align: top; }
body { line-height: 1; background: white; color: black; }
q { quotes: "" ""; }
ul, ol, dir, menu { list-style: none; }
sub, sup { vertical-align: baseline; }
a { color: inherit; }
hr { display: none; } /* we don't need a visual hr in layout */
font { color: inherit !important; font: inherit !important; color: inherit !important; } /* disables some nasty font attributes in standard browsers */
marquee { overflow: inherit !important; -moz-binding: none; }
blink { text-decoration: none; }
nobr { white-space: normal; }

/*generic css*/
/*
    Tripoli is a generic CSS standard for HTML rendering. 
    Copyright (C) 2007  David Hellsing

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
-----------------------------
GENERIC
-----------------------------
*/

/* MAIN TYPOGRAPHY */

html { font-size: 62.5%; font-family: helvetica, "microsoft sans serif", arial, sans-serif; }
strong, th, thead td, h1, h2, h3, h4, h5, h6, dt { font-weight: bold; }
cite, em, dfn { font-style: italic; }
code, kbd, samp, pre, tt, var { font-size: 92%; font-family: monaco, "Lucida Console", courier, mono-space; }
pre { white-space: pre; }
pre * { font-size: 100%; white-space: pre; }
del { text-decoration: line-through; color: #666; }
ins, dfn { border-bottom: 1px solid #ccc; }
small, sup, sub { font-size: 85%; }
big { font-size: 125%; line-height: 80%; }
abbr, acronym { text-transform: uppercase; font-size: 85%; letter-spacing: .1em; }
a abbr, a acronym { border: none; }
abbr[title], acronym[title], dfn[title] { cursor: help; border-bottom: 1px solid #ccc; }
sup { vertical-align: super; }
sub { vertical-align: sub; }
a:link, a:visited, a:hover, a:active, a:focus { text-decoration: underline; }

/* QUOTES */

blockquote { border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; color: #666; }
blockquote > *:before { content: "\201C"; }
blockquote > *:after { content: "\201D"; }

/* language specific quotes! */

q { quotes: "\201C" "\201D" "\2018" "\2019"; }
:lang(af), :lang(nl), :lang(pl) { quotes: '\201E' '\201D' '\201A' '\2019'; }
:lang(bg), :lang(cs), :lang(de), :lang(is), :lang(lt), :lang(sk), :lang(sr), :lang(ro) { quotes: '\201E' '\201C' '\201A' '\2018'; }
:lang(da), :lang(hr) { quotes: '\00BB' '\00AB' '\203A' '\2039'; }
:lang(el), :lang(es), :lang(sq), :lang(tr) { quotes: '\00AB' '\00BB' '\2039' '\203A'; }
:lang(en-GB) { quotes: '\2018' '\2019' '\201C' '\201D'; }
:lang(fi), :lang(sv) { quotes: '\201D' '\201D' '\2019' '\2019'; }
:lang(fr) { quotes: '\ab\2005' '\2005\bb' '\2039\2005' '\2005\203a'; }

/* NOTE: safari refuses to support the quotes syntax. I only added the english language quotes for safari to save space. */
*[lang|='en'] q:before   { content: '\201C'; }
*[lang|='en'] q:after    { content: '\201D'; }
*[lang|='en'] q q:before { content: '\2018'; }
*[lang|='en'] q q:after  { content: '\2019'; }

/* FORMS */

fieldset { border: 1px solid #ccc; }
legend { background: #fff; }
textarea, input[type='text'], select { border: 1px solid #ccc; background: #fff; }
/* textarea:hover, input[type='text']:hover, input[type='password']:hover, select:hover { border-color: #aaa; }
textarea:focus, input[type='text']:focus, input[type='password']:focus, select:focus { border-color: #888; outline: 2px solid #ddd; }*/
input[type='button'], input[type='submit'], input[type='checkbox'], input[type='image'], input[type='radio'], input[type='reset'], select, button { cursor: pointer; }
input[type='hidden'] { display:none; }

/*END GENERIC CSS*/
.ms-core-custom-menu{ width:200px; margin: 40px auto;}
.ms-core-custom-menu a{ text-decoration: none;}
.ms-core-custom-menu a:hover{ text-decoration: underline;}
</style>
</head>

<body>
    <div class="ms-core-custom-menu">

    </div>
</body>
 <script type="text/javascript" src="msCoreCustomMenu.js"></script><!-- plugin do menu -->
    <script src="menu.json"></script><!-- json com a estrutura do menu-->
    <script type="text/javascript">
    $(function() {
        $(".ms-core-custom-menu").msCoreCustomMenu({json:msCoreCustomMenuJson});

    });

    function openCustomFunc(argument)    {
        alert('Calling function ' + argument); 
        return false;
    }
    </script>
</html>

package is.ru.cs.nlp.icenlp.web;

import is.iclt.icenlp.core.icemorphy.IceMorphyLexicons;
import is.iclt.icenlp.core.icemorphy.IceMorphyResources;
import is.iclt.icenlp.core.icetagger.IceTagger;
import is.iclt.icenlp.facade.*;
import is.iclt.icenlp.core.tokenizer.*;
import is.iclt.icenlp.core.icetagger.IceTaggerLexicons;
import is.iclt.icenlp.core.icetagger.IceTaggerResources;
import is.iclt.icenlp.core.tritagger.TriTaggerLexicons;
import is.iclt.icenlp.core.tritagger.TriTaggerResources;
import is.iclt.icenlp.core.utils.IceTag;
import is.iclt.icenlp.core.utils.Lexicon;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.logging.Logger;
import is.iclt.icenlp.core.lemmald.Lemmald;
import is.iclt.icenlp.core.iceparser.OutputFormatter;

/**
 * Web interface for tagging and parsing Icelandic text
 * @author Sverrir Sigmundarson
 * Various changes made by Hrafn Loftsson
 */
@WebServlet("/IceNLPServlet/process/")
public class IceNLPServlet extends HttpServlet
{
    private String defaultEncoding="UTF-8";
    private Lexicon tokLex=null;
    private IceTaggerLexicons iceLex=null;
    private IceMorphyLexicons morphyLex=null;
    private TriTaggerLexicons triLex=null;
    private IceTaggerFacade itf=null;
    private IceParserFacade ipf=null;
    private Segmentizer segmentizer = null;
    Lemmald lemmald = null;
    OutputFormatter.OutputType outType=OutputFormatter.OutputType.plain;
    private final static Logger LOGGER = Logger.getLogger(IceNLPServlet.class.getName());
    
   
    
    @Override
    public  void init(ServletConfig config) throws ServletException
    {
    	LOGGER.info("info");
        super.init(config);
        //defaultEncoding = FileEncoding.getEncoding();
        TokenizerResources tokResources = new TokenizerResources();
        if (tokResources.isLexicon == null) throw new ServletException( "Could not locate token dictionary");

        IceTaggerResources iceResources = new IceTaggerResources();
        IceMorphyResources morphyResources = new IceMorphyResources();

        if( morphyResources.isDictionaryBase == null ) throw new ServletException("Could not locate base dictionary");
        if( morphyResources.isDictionary == null ) throw new ServletException("Could not locate otb dictionary");
        if( morphyResources.isEndingsBase == null ) throw new ServletException("Could not locate endings base dictionary");
		if( morphyResources.isEndings == null ) throw new ServletException("Could not locate endings dictionary");
		if( morphyResources.isEndingsProper == null ) throw new ServletException("Could not locate endings proper dictionary");
		if( morphyResources.isPrefixes == null ) throw new ServletException("Could not locate prefixes dictionary");
		if( morphyResources.isTagFrequency == null ) throw new ServletException("Could not locate tag frequency dictionary" );
		if( iceResources.isIdioms == null ) throw new ServletException("Could not locate idioms dictionary" );
		if( iceResources.isVerbPrep == null ) throw new ServletException("Could not locate verb prep dictionary" );
		if( iceResources.isVerbObj == null ) throw new ServletException("Could not locate verb obj dictionary");
		if( iceResources.isVerbAdverb == null ) throw new ServletException("Could not locate verb adverb dictionary" );
        
        // For TriTagger
        TriTaggerResources triResources = new TriTaggerResources();
		if( triResources.isNgrams == null ) throw new ServletException("Could not locate model ngram");
		if( triResources.isLambda == null ) throw new ServletException( "Could not locate lambdas");
		if( triResources.isFrequency == null ) throw new ServletException("Could not locate model frequency");

        try
        {
            tokLex = new Lexicon(tokResources.isLexicon);
            this.segmentizer = new Segmentizer(tokLex);
        }
        catch (IOException e) {throw new ServletException("Could not create tokenizer lexicon", e); }

        try {
            morphyLex = new IceMorphyLexicons(morphyResources);
        } catch (IOException e) {throw new ServletException("Could not create IceMorphy lexicon", e); }

        try {
                iceLex = new IceTaggerLexicons(iceResources);
        } catch (IOException e) {throw new ServletException("Could not create IceTagger lexicon", e); }

        try {
            triLex = new TriTaggerLexicons(triResources, true);
        } catch (IOException e) {throw new ServletException("Could not create TriTagger lexicon", e); }


        try {
                itf = new IceTaggerFacade(iceLex, morphyLex, tokLex);
                itf.createTriTagger(triLex);
                ipf = new IceParserFacade();
        }
        catch (IOException e) {throw new ServletException("Could not create Facade objects", e); }

        // Let's get a lemmald instance.
        this.lemmald = Lemmald.getInstance();

    }

    protected void doGet( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException
	{
    	response.getWriter().println(request);
		doPost( request, response );
	}
    
    protected void doOptions( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException
	{
    	response.addHeader("Access-Control-Allow-Origin", "*");
    	response.getWriter().println(request);
		//doPost( request, response );
	}

    private String writeTaggedText(Sentences sents, PrintWriter out, boolean sentLine, boolean markUnknown, boolean english, boolean showLemma)
    {
       // out.write("<p>");
        String json = "{\"ParsedText\" : {\"Sentences\" : [";
        int count = 0;
        for( Sentence sent : sents.getSentences() ) {
        	if(count != 0)
        		json += "]},";
        	json += "{\"WORDS\" : [";
        	count++;
            ArrayList tokenList = sent.getTokens();
            for (int i=0; i<=tokenList.size()-1; i++) {
                IceTokenTags tok = (IceTokenTags)tokenList.get(i);
                if(!tok.lexeme.chars().allMatch(Character::isLetter)) 
                	break;
               // out.write(tok.lexeme + " ");
                if(i != 0)
                	json += ",";
                
                json += "{\"Word\" : \"" + tok.lexeme + "\", ";
                IceTag tag = (IceTag)tok.getFirstTag();
                json += "\"Tag\" : \"" +tag + "\", ";
                json += "\"Class\" : \"" + tag.getFirstLetter() + "\"}";
            }
        }
        json += "]} ]} }";
        LOGGER.info(json);
        
        return json;
    }

    private void tokenize(String query, PrintWriter out, boolean english, boolean useStricktToken, int inputTokenizeType) throws IOException
    {
        if (english)
            out.write("<h3>Tokenisation:</h3>");
        else
            out.write("<h3>Tilreiðing:</h3>");

        Tokenizer tok = new Tokenizer(inputTokenizeType, useStricktToken, this.tokLex);
        segmentizer.segmentize(query);
        while(segmentizer.hasMoreSentences())
        {
           String sentenceStr = segmentizer.getNextSentence();
           tok.tokenize(sentenceStr);
           if(tok.tokens.size() <= 0)
               continue;

           tok.splitAbbreviations();

           for(Object token : tok.tokens)
             out.write("<span>" + ((TokenTags)token).lexeme + "</span><br />");

           out.write("<br />");
       }
    }
    
    @Override
	protected void doPost( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException
	{
        boolean functions=false, phraseLine=false, sentLine=false, markUnknown=false;
        boolean /*useHybrid=false,*/ showLemma=false, showTokenization=false, strictTokenization=false;
        boolean mergeLabels=false, featureAgreement=false, showErrors=false;
        int inputTokenizeType = 0;
        IceTagger.HmmModelType modelType = IceTagger.HmmModelType.none;

        // Get the request handles
        request.setCharacterEncoding(defaultEncoding);
        String query = request.getParameter( "query" );
        byte[] bytes = query.getBytes(StandardCharsets.ISO_8859_1);
        query = new String(bytes, StandardCharsets.UTF_8);
        LOGGER.info(query);
        LOGGER.info("góður");
        //boolean english = (request.getParameter("english").equals("true"));

        if(request.getParameter("functions") != null)
            functions = (request.getParameter("functions").equals("true"));
        if(request.getParameter("phraseline") != null)
            phraseLine = (request.getParameter("phraseline").equals("true"));
        if(request.getParameter("mergelabels") != null)
            mergeLabels = (request.getParameter("mergelabels").equals("true"));
        if(request.getParameter("sentline") != null)
            sentLine = (request.getParameter("sentline").equals("true"));
        if(request.getParameter("markunknown") != null)
            markUnknown = (request.getParameter("markunknown").equals("true"));
        //if(request.getParameter("tagger") != null)
        //    useHybrid = (request.getParameter("tagger").equals("Hybrid"));
        // Set the model type in case using an HMM model
        if(request.getParameter("tagger") != null) {
            if (request.getParameter("tagger").equals("IceTagger"))
                modelType = IceTagger.HmmModelType.none;
            else if (request.getParameter("tagger").equals("HMMIce"))
                modelType = IceTagger.HmmModelType.start;
            else if (request.getParameter("tagger").equals("IceHMM"))
                modelType = IceTagger.HmmModelType.end;
            else if (request.getParameter("tagger").equals("HMMIceHMM"))
                modelType = IceTagger.HmmModelType.startend;

        }
        if(request.getParameter("showlemma") != null)
            showLemma = (request.getParameter("showlemma").equals("true"));
        if(request.getParameter("showerrors") != null)
            showErrors = (request.getParameter("showerrors").equals("true"));
        if(request.getParameter("agreement") != null)
            featureAgreement = (request.getParameter("agreement").equals("true"));


        // Selection of tokenization.
        if(request.getParameter("showTokenize") != null)
            showTokenization = (request.getParameter("showTokenize").equals("true"));
        
        // Selection of the tokenizition type.
        if(request.getParameter("stricktTokenize") != null)
            strictTokenization = (request.getParameter("stricktTokenize").equals("true"));
        
        if(request.getParameter("inputTokenize") != null)
        	inputTokenizeType = Integer.parseInt(request.getParameter("inputTokenize"));

        // Return the fully tagged and parsed string
        response.setContentType("text/html;charset="+defaultEncoding);
        response.addHeader("Access-Control-Allow-Origin", "*");
        
        PrintWriter out = response.getWriter();
        out.write("");
        
        // Tag the query
        response.getWriter().write(analyse(query, out, false, sentLine, markUnknown, functions, phraseLine, mergeLabels, featureAgreement, showErrors, modelType, showTokenization, strictTokenization,inputTokenizeType, showLemma));
	
	}

    private void testDict()
    {
       Lexicon baseDict = morphyLex.baseDict;

       for (Enumeration keys = baseDict.keys() ; keys.hasMoreElements() ;) {
          System.out.println(keys.nextElement());
       }
    }
    
    private String analyse(String query, PrintWriter out, boolean english, boolean sentLine, boolean markUnknown,
                         boolean functions, boolean phraseLine, boolean mergeLabels, boolean featureAgreement, boolean showErrors,
                         IceTagger.HmmModelType modelType, boolean showTokenization, boolean useStricktToken, int inputTokenizeType, boolean showLemma) throws IOException
    {
    
    	String json = "";

        Sentences sents = itf.tag(query);
        long tagEnd = System.currentTimeMillis();

        // Parse
        long parseStart = System.currentTimeMillis();
        if (phraseLine)
            outType = OutputFormatter.OutputType.phrase_per_line;
        else
            outType = OutputFormatter.OutputType.plain;

        String parsed = ipf.parse( sents.toString(), outType, functions, featureAgreement, showErrors, mergeLabels );
        long parseEnd = System.currentTimeMillis();

        json = writeTaggedText(sents, out, sentLine, markUnknown, english, showLemma);

        return json;
    }

    private boolean printWebError( PrintWriter out, String errorstring )
	{
		out.write( errorstring + "<br />" );
		return true;
	}
}
